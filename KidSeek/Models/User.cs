using System.ComponentModel.DataAnnotations;

namespace KidSeek.Api.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }
    }
}
