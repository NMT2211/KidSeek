using Microsoft.AspNetCore.Mvc;
using KidSeek.Api.Data;
using KidSeek.Api.Models;
using KidSeek.Api.Models.Auth;
using System.Linq;
using System.Threading.Tasks;


namespace KidSeek.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly KidSeekDbContext _context;

        public AuthController(KidSeekDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            if (_context.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Tên đăng nhập đã tồn tại");

            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password, // nên hash ở bước sau
                Email = dto.Email,
                Role = dto.Role,
                Age = dto.Age,
                Grade = dto.Grade
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "Đăng ký thành công", user.Username });
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(
                u => u.Username == dto.Username && u.Password == dto.Password
            );

            if (user == null)
                return Unauthorized("Sai tên đăng nhập hoặc mật khẩu");

            return Ok(new
            {
                message = "Đăng nhập thành công",
                user.UserId,
                user.Username,
                user.Role
            });
        }
    }
}
