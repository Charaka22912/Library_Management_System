using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}