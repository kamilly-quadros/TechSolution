using System.ComponentModel.DataAnnotations;

namespace TechSolutions.Server.Models;

public class Branch
{
    public int Id { get; set; }
    [Required] public string Name { get; set; } = null!;
    public string? Address { get; set; }
}
