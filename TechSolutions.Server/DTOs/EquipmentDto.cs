namespace TechSolutions.Server.DTOs;

public class EquipmentDto
{
    public string Name { get; set; } = null!;
    public string? SerialNumber { get; set; }
    public string? Description { get; set; }
    public int BranchId { get; set; }
}
