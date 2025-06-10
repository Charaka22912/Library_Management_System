using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }
        public DbSet<User> Users { get; set; } // DbSet for User model
        public DbSet<Book> Books { get; set; } // DbSet for Book model
    }
}