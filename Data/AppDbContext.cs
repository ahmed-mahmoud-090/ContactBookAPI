using Microsoft.EntityFrameworkCore;
using ContactBookAPI.Models;
using System.Collections.Generic;

namespace ContactBookAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
