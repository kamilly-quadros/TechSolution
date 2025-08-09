using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TechSolutions.Server.Data;
using TechSolutions.Server.DTOs;
using TechSolutions.Server.Models;

namespace TechSolutions.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ActionsController : ControllerBase
{
    private readonly TechSolutionsDbContext _db;
    public ActionsController(TechSolutionsDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> AddAction([FromBody] ActionDto dto)
    {
        var equipment = await _db.Equipments.FindAsync(dto.EquipmentId);
        if (equipment == null) return BadRequest("Equipamento não encontrado");
        if (!Enum.TryParse<ActionType>(dto.ActionType, out var actionType))
            actionType = ActionType.Other;
        int? destBranchId = dto.DestinationBranchId;
        if (actionType == ActionType.Transfer && destBranchId == null) return BadRequest("Transferência precisa de destino");
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        int.TryParse(userIdStr, out int userId);
        var record = new ActionRecord
        {
            EquipmentId = dto.EquipmentId,
            ActionType = actionType,
            Comment = dto.Comment,
            DestinationBranchId = destBranchId,
            PerformedByUserId = userId,
            Date = DateTime.UtcNow
        };
        switch (actionType)
        {
            case ActionType.EnterMaintenance:
                equipment.State = EquipmentState.Manutenção;
                break;
            case ActionType.Transfer:
                equipment.State = EquipmentState.Transferido;
                if (destBranchId != null) equipment.BranchId = destBranchId.Value;
                break;
            case ActionType.Discard:
                equipment.State = EquipmentState.Descartado;
                break;
            default:
                break;
        }
        _db.ActionRecords.Add(record);
        await _db.SaveChangesAsync();
        return Ok(record);
    }

    [HttpGet("equipment/{equipmentId}")]
    public async Task<IActionResult> GetHistory(int equipmentId)
    {
        var records = await _db.ActionRecords
            .Where(r => r.EquipmentId == equipmentId)
            .Include(r => r.PerformedByUser)
            .Include(r => r.DestinationBranch)
            .OrderByDescending(r => r.Date)
            .ToListAsync();
        return Ok(records);
    }
}
