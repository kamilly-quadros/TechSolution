using System.ComponentModel.DataAnnotations;

namespace TechSolutions.Server.Models;
public enum EquipmentState
{
    Disponível,
    Manutenção,
    Transferido,
    Descartado
}
public class Equipment
{
    public int Id { get; set; }
    [Required] public string Name { get; set; } = null!;
    public string? SerialNumber { get; set; }
    public string? Description { get; set; }
    public EquipmentState State { get; set; } = EquipmentState.Disponível;
    public int BranchId { get; set; }
    public Branch? Branch { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<ActionRecord>? Actions { get; set; }
}
