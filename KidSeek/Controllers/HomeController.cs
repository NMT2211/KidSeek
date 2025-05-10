using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using KidSeek.Models;

namespace KidSeek.Controllers;

// Ví dụ tạo KhoaHocController
[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(new[] {
            new { Ma = 1, Ten = "Toán lớp 1" },
            new { Ma = 2, Ten = "Tiếng Việt lớp 2" }
        });
    }
}

