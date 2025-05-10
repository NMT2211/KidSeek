using Microsoft.EntityFrameworkCore;
using KidSeek.Api.Models;

namespace KidSeek.Api.Data
{ 

    public class KidSeekDbContext : DbContext
{
    public KidSeekDbContext(DbContextOptions<KidSeekDbContext> options) : base(options) { }

    public DbSet<MonHoc> MonHocs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MonHoc>().ToTable("MonHoc");
    }
}

}
   


