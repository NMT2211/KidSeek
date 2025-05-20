using System;
using System.ComponentModel.DataAnnotations;

namespace KidSeek.Api.Models
{
    public class ChatResult
    {
        [Key]
        public int ChatResultId { get; set; }

        public int UserId { get; set; }
        public int SubjectId { get; set; }

        public string Prompt { get; set; }             // ✅ Prompt sinh câu hỏi
        public string? AiResponse { get; set; }         // ✅ JSON câu hỏi từ AI
        public string? AiFeedback { get; set; }        // ✅ JSON phản hồi chấm điểm từ AI

        public string? Questions { get; set; }         // ✅ Danh sách câu hỏi sinh ra từ AI

        public double? Score { get; set; }             // ✅ Điểm tổng
        public string? Comment { get; set; }           // ✅ Nhận xét giáo viên
        public bool IsGraded { get; set; } = false;    // ✅ Đã chấm chưa
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
