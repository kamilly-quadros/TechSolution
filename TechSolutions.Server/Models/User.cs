using System.ComponentModel.DataAnnotations;

namespace TechSolutions.Server.Models;

public class User
{
    public int Id { get; set; }
    [Required] public string Username { get; set; } = null!;
    [Required] public string PasswordHash { get; set; } = null!;
    [Required] public string FullName { get; set; } = null!;
}
