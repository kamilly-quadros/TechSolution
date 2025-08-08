using System.ComponentModel.DataAnnotations;

namespace TechSolutions.Server.Models;
public enum ActionType
{
    EnterMaintenance,
    Transfer,
    Discard,
    Other
}
public class ActionRecord
{
    public int Id { get; set; }
    public int EquipmentId { get; set; }
    public Equipment? Equipment { get; set; }
    [Required] public ActionType ActionType { get; set; }
    public string? Comment { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public int? PerformedByUserId { get; set; }
    public User? PerformedByUser { get; set; }
    public int? DestinationBranchId { get; set; }
    public Branch? DestinationBranch { get; set; }
}
