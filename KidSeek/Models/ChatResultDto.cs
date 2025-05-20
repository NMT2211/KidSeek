namespace KidSeek.Api.Models
{ 
    public class ChatResultDto
    {
        public int UserId { get; set; }
        public int SubjectId { get; set; }
        public string Prompt { get; set; } = string.Empty;
        public string AiResponse { get; set; } = string.Empty;
    }


}