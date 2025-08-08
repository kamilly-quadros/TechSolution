namespace TechSolutions.Server.DTOs;

public class ActionDto
{
    public int EquipmentId { get; set; }
    public string ActionType { get; set; } = "Other";
    public string? Comment { get; set; }
    public int? DestinationBranchId { get; set; }
}
