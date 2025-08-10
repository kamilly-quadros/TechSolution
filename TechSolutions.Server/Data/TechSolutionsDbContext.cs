using Microsoft.EntityFrameworkCore;
using TechSolutions.Server.Models;

namespace TechSolutions.Server.Data;

public class TechSolutionsDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Branch> Branches => Set<Branch>();
    public DbSet<Equipment> Equipments => Set<Equipment>();
    public DbSet<ActionRecord> ActionRecords => Set<ActionRecord>();
    public TechSolutionsDbContext(DbContextOptions<TechSolutionsDbContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        var pwdHash = BCrypt.Net.BCrypt.HashPassword("senha123");
        modelBuilder.Entity<User>().HasData(new User { Id = 1, Username = "admin", PasswordHash = pwdHash, FullName = "Administrador" });
        modelBuilder.Entity<Branch>().HasData(
            new Branch { Id = 1, Name = "Matriz", Address = "Bairro do Limoeiro, 123" },
            new Branch { Id = 2, Name = "Filial 1", Address = "Rua dos Bobos, 0" },
            new Branch { Id = 3, Name = "Filial 2", Address = "Barker Street, 221B" }
        );
    }
}
