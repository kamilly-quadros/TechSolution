using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechSolutions.Server.Data;
using TechSolutions.Server.DTOs;
using TechSolutions.Server.Models;

namespace TechSolutions.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EquipmentsController : ControllerBase
{
    private readonly TechSolutionsDbContext _db;
    public EquipmentsController(TechSolutionsDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _db.Equipments
            .Include(e => e.Branch)
            .Include(e => e.Actions)
                .ThenInclude(a => a.PerformedByUser)
            .ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
            var equipment = await _db.Equipments
                .Include(x => x.Branch)
                .Include(x => x.Actions)
                    .ThenInclude(a => a.PerformedByUser)
                .Include(x => x.Actions)
                    .ThenInclude(a => a.DestinationBranch)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (equipment == null)
                return NotFound();
            return Ok(equipment);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EquipmentDto dto)
    {
        var branch = await _db.Branches.FindAsync(dto.BranchId);
        if (branch == null) return BadRequest("Branch inválida");
        var equipment = new Equipment
        {
            Name = dto.Name,
            SerialNumber = dto.SerialNumber,
            Description = dto.Description,
            BranchId = dto.BranchId,
            State = EquipmentState.Disponível
        };
        _db.Equipments.Add(equipment);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = equipment.Id }, equipment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] EquipmentDto dto)
    {
        var equipment = await _db.Equipments.FindAsync(id);
        if (equipment == null) return NotFound();
        equipment.Name = dto.Name;
        equipment.SerialNumber = dto.SerialNumber;
        equipment.Description = dto.Description;
        equipment.BranchId = dto.BranchId;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var equipment = await _db.Equipments.FindAsync(id);
        if (equipment == null) return NotFound();
        _db.Equipments.Remove(equipment);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
