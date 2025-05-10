using KidSeek.Api.Data;
using KidSeek.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KidSeek.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonHocController : ControllerBase
    {
        private readonly KidSeekDbContext _context;

        public MonHocController(KidSeekDbContext context)
        {
            _context = context;
        }

        // GET: api/monhoc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MonHoc>>> GetAll()
        {
            return await _context.MonHocs.ToListAsync();
        }

        // GET: api/monhoc/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MonHoc>> GetById(int id)
        {
            var mon = await _context.MonHocs.FindAsync(id);
            if (mon == null)
                return NotFound();

            return mon;
        }

        // POST: api/monhoc
        [HttpPost]
        public async Task<ActionResult<MonHoc>> Create(MonHoc monHoc)
        {
            _context.MonHocs.Add(monHoc);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = monHoc.MaMonHoc }, monHoc);
        }

        // PUT: api/monhoc/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MonHoc monHoc)
        {
            if (id != monHoc.MaMonHoc)
                return BadRequest();

            _context.Entry(monHoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.MonHocs.Any(e => e.MaMonHoc == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/monhoc/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var mon = await _context.MonHocs.FindAsync(id);
            if (mon == null)
                return NotFound();

            _context.MonHocs.Remove(mon);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
