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
                return BadRequest(new { error = "Tên đăng nhập đã tồn tại" });

            if (_context.Users.Any(u => u.Email == dto.Email))
                return BadRequest(new { error = "Email đã được sử dụng" });

            var allowedRoles = new[] { "Phu_huynh", "Giao_vien", "Hoc_sinh", "Admin" };
            if (!allowedRoles.Contains(dto.Role))
                return BadRequest(new { error = "Vai trò không hợp lệ" });

            var user = new User
            {
                Username = dto.Username,
                Fullname = dto.Fullname,
                Password = dto.Password,
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
                u => (u.Username == dto.UsernameOrEmail || u.Email == dto.UsernameOrEmail)
                    && u.Password == dto.Password
            );

            if (user == null)
                return Unauthorized("Sai tên đăng nhập/email hoặc mật khẩu");

            return Ok(new
            {
                message = "Đăng nhập thành công",
                user.UserId,
                user.Username,
                user.Fullname,
                user.Age,
                user.Grade,
                user.Email,
                user.Role
            });
        }

    }
}
