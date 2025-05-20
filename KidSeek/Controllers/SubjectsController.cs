using Microsoft.AspNetCore.Mvc;
using KidSeek.Api.Data;
using KidSeek.Api.Models;
using System.Linq;

namespace KidSeek.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubjectsController : ControllerBase
    {
        private readonly KidSeekDbContext _context;

        public SubjectsController(KidSeekDbContext context)
        {
            _context = context;
        }

        // GET: api/subjects
        [HttpGet]
        public IActionResult GetAllSubjects()
        {
            var subjects = _context.Subjects
                .OrderByDescending(s => s.CreatedAt)
                .ToList();

            return Ok(subjects);
        }

        // GET: api/subjects/by-grade/{grade}
        [HttpGet("by-grade/{grade}")]
        public IActionResult GetSubjectsByGrade(int grade)
        {
            var subjects = _context.Subjects
                .Where(s => s.Grade == grade)
                .OrderByDescending(s => s.CreatedAt)
                .ToList();

            if (!subjects.Any())
                return NotFound(new { message = $"Không tìm thấy môn học nào cho lớp {grade}" });

            return Ok(subjects);
        }
    }
}
