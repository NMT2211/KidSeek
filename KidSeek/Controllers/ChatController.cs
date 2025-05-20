using Microsoft.AspNetCore.Mvc;
using KidSeek.Api.Data;
using KidSeek.Api.Models;
using System.Text.Json;
using System.Net.Http.Headers;
using System.Text;


namespace KidSeek.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly KidSeekDbContext _context;
        private readonly IConfiguration _config; // ✅ thêm dòng này

        public ChatController(KidSeekDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("save-result")]
        public IActionResult SaveChatResult([FromBody] ChatResult result)
        {
            result.CreatedAt = DateTime.Now;

            // Xử lý định dạng lại AiResponse nếu cần
            if (!string.IsNullOrWhiteSpace(result.AiResponse) && !IsValidJson(result.AiResponse))
            {
                try
                {
                    using var doc = JsonDocument.Parse(result.AiResponse);
                    result.AiResponse = JsonSerializer.Serialize(doc.RootElement);
                }
                catch
                {
                    // Nếu không phải JSON thì giữ nguyên
                }
            }

            // ✅ Trích danh sách câu hỏi từ AiResponse và lưu vào cột Questions
            if (!string.IsNullOrWhiteSpace(result.AiResponse))
            {
                try
                {
                    using var doc = JsonDocument.Parse(result.AiResponse);
                    var root = doc.RootElement;

                    if (root.TryGetProperty("questions", out var questionsElement))
                    {
                        var questions = questionsElement.EnumerateArray()
                            .Select(q => q.GetProperty("question").GetString())
                            .Where(q => !string.IsNullOrWhiteSpace(q))
                            .ToList();

                        result.Questions = string.Join(" | ", questions); // Dùng dấu | để ngăn cách
                    }
                }
                catch
                {
                    result.Questions = null; // Nếu lỗi parsing thì không lưu
                }
            }

            _context.ChatResults.Add(result);
            _context.SaveChanges();

            return Ok(new { message = "Đã lưu phiên luyện tập", result.ChatResultId });
        }



        private bool IsValidJson(string str)
        {
            try
            {
                JsonDocument.Parse(str);
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpPost("submit-answers")]
        public async Task<IActionResult> SubmitAnswers([FromBody] JsonElement body)
        {
            if (!body.TryGetProperty("chatResultId", out var chatResultIdElement) ||
                !body.TryGetProperty("answers", out var answersElement))
            {
                return BadRequest("Thiếu dữ liệu.");
            }

            int chatResultId = chatResultIdElement.GetInt32();
            var result = _context.ChatResults.FirstOrDefault(x => x.ChatResultId == chatResultId);
            if (result == null || string.IsNullOrEmpty(result.AiResponse))
                return BadRequest("Không tìm thấy phiên luyện tập hoặc dữ liệu AI.");

            var parsedAnswers = answersElement.Deserialize<List<ChatAnswer>>();
            string feedbackJson = await CallAiFeedback(result.AiResponse, parsedAnswers);

            try
            {
                string unescapedJson = System.Text.RegularExpressions.Regex.Unescape(feedbackJson);
                int start = unescapedJson.IndexOf("{");
                int end = unescapedJson.LastIndexOf("}");

                if (start < 0 || end <= start)
                    throw new Exception("Không tìm thấy đoạn JSON trong phản hồi.");

                string jsonExtracted = unescapedJson.Substring(start, end - start + 1);
                using var doc = JsonDocument.Parse(jsonExtracted);
                var root = doc.RootElement;

                double score = root.GetProperty("score").GetDouble();
                string comment = root.GetProperty("comment").GetString();
                var results = root.GetProperty("results");

                // ✅ Lưu lại vào ChatResult
                result.Score = score;
                result.Comment = comment;
                result.IsGraded = true;
                result.AiFeedback = jsonExtracted;
                result.AiResponse = null; // ✅ Xoá sau khi chấm
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "ok",
                    score,
                    comment,
                    details = results.EnumerateArray().Select(x => new
                    {
                        question = x.GetProperty("question").GetString(),
                        studentAnswer = x.GetProperty("studentAnswer").GetString(),
                        correctAnswer = x.GetProperty("correctAnswer").GetString(),
                        isCorrect = x.GetProperty("isCorrect").GetBoolean(),
                        explanation = x.GetProperty("explanation").GetString()
                    }).ToList()
                });
            }

            catch (Exception ex)
            {
                return Ok(new
                {
                    status = "error",
                    raw = feedbackJson,
                    error = ex.Message
                });
            }
        }

        private async Task<string> CallAiFeedback(string aiResponse, List<ChatAnswer> answers)
        {
            var formattedAnswers = answers.Select((a, i) =>
                $"{i + 1}. Câu hỏi: {a.Question}\ntrả lời: {a.StudentAnswer}");

            string aiFormatted;
            try
            {
                aiFormatted = JsonSerializer.Serialize(
                    JsonDocument.Parse(aiResponse).RootElement,
                    new JsonSerializerOptions { WriteIndented = true }
                );
            }
            catch
            {
                aiFormatted = aiResponse;
            }

            string prompt = @$"
Bạn là giáo viên. Dưới đây là danh sách câu hỏi (JSON gốc từ AI) và câu trả lời của học sinh.

Hãy chấm điểm mỗi câu (score .../10) và phản hồi theo JSON:

{{
  ""score"": 10,
  ""comment"": ""Nhận xét tổng thể, điểm mạnh/yếu, khuyên học sinh."",
  ""results"": [
    {{
      ""question"": ""..."",
      ""studentAnswer"": ""..."",
      ""correctAnswer"": ""..."",
      ""isCorrect"": true,
      ""explanation"": ""...""
    }}
  ]
}}

Câu hỏi:
{aiFormatted}

Câu học sinh trả lời:
{string.Join("\n\n", formattedAnswers)}
";

            var requestBody = new
            {
                model = "deepseek-chat",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);
            using var http = new HttpClient();

            var apiKey = _config["ApiKeys:DeepSeek"];
            http.DefaultRequestHeaders.Authorization = 
                new AuthenticationHeaderValue("Bearer", apiKey);

            

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await http.PostAsync("https://api.deepseek.com/v1/chat/completions", content);
            var result = await response.Content.ReadAsStringAsync();

            int start = result.IndexOf("```json");
            int end = result.LastIndexOf("```");

            return (start >= 0 && end > start)
                ? result.Substring(start + 7, end - start - 7).Trim()
                : result;
        }

       
[HttpGet("previous-questions")]
public IActionResult GetPreviousQuestions(int userId, int subjectId)
{
    // Lấy 50 bản ghi ChatResults gần nhất có chứa Questions
    var chatResults = _context.ChatResults
        .Where(r => r.UserId == userId && r.SubjectId == subjectId && !string.IsNullOrEmpty(r.Questions))
        .OrderByDescending(r => r.CreatedAt)
        .Take(50) // ✅ Lấy đúng 50 bản ghi, không phải 50 câu
        .Select(r => r.Questions)
        .ToList();

    var questions = new List<string>();

    foreach (var entry in chatResults)
    {
        var split = entry.Split('|', StringSplitOptions.RemoveEmptyEntries)
                         .Select(q => q.Trim());
        questions.AddRange(split);
    }

    var uniqueQuestions = questions
        .Where(q => !string.IsNullOrWhiteSpace(q))
        .Distinct()
        .ToList();

    return Ok(new { questions = uniqueQuestions });
}




    }
}
