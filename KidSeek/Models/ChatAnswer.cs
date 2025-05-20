using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KidSeek.Api.Models
{
    public class ChatAnswer
    {
        [Key]
        public int AnswerId { get; set; }

        [Required]
        public int ChatResultId { get; set; }

        [Required]
        public string Question { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string StudentAnswer { get; set; } = string.Empty;

        [MaxLength(10)]
        public string? CorrectAnswer { get; set; }

        public bool? IsCorrect { get; set; }

        public string? Explanation { get; set; }
         public string? AiFeedback { get; set; } 
        public DateTime AnsweredAt { get; set; } = DateTime.Now;

        [ForeignKey("ChatResultId")]
        public ChatResult ChatResult { get; set; } = null!;
    }
}
