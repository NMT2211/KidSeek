using System.ComponentModel.DataAnnotations;

namespace KidSeek.Api.Models.Auth
{
    public class RegisterDto
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        [RegularExpression("^(Phu_huynh|Giao_vien|Hoc_sinh|Admin)$", ErrorMessage = "Vai trò không hợp lệ")]
        public string Role { get; set; }

        public string Fullname { get; set; }
        public int Age { get; set; }
        public int Grade { get; set; }
    }
}
