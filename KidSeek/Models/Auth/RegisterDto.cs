namespace KidSeek.Api.Models.Auth
{
    public class RegisterDto
    {
        public int Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

        public int Age { get; set; }
        public int Grade { get; set; }
    }
}
