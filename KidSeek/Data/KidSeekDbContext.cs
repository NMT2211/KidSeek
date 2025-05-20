using Microsoft.EntityFrameworkCore;
using KidSeek.Api.Models;

namespace KidSeek.Api.Data
{
    public class KidSeekDbContext : DbContext
    {
        public KidSeekDbContext(DbContextOptions<KidSeekDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<ChatResult> ChatResults { get; set; }
        public DbSet<ChatAnswer> ChatAnswers { get; set; }

    }
}
