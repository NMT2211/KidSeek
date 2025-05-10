using Microsoft.EntityFrameworkCore;
using KidSeek.Api.Models;

namespace KidSeek.Api.Data
{
    public class KidSeekDbContext : DbContext
    {
        public KidSeekDbContext(DbContextOptions<KidSeekDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
