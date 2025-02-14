using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            if (_employeeContext.Employees == null)
                return NotFound();

            return await _employeeContext.Employees.ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeesById(int id)
        {
            if (_employeeContext.Employees == null)
                return NotFound();

            var employee = await _employeeContext.Employees.FindAsync(id);

            if (employee == null)
                return NotFound($"Employee with ID:{id} not found.");

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee(Employee emp)
        {
            _employeeContext.Employees.Add(emp);
            await _employeeContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeesById), new { id = emp.ID }, emp);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee(int id, Employee emp)
        {
            if (id != emp.ID)
                return BadRequest();

            _employeeContext.Entry(emp).State = EntityState.Modified;
            try
            {
                await _employeeContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            if (_employeeContext.Employees == null)
                return NotFound();

            var employee = await _employeeContext.Employees.FindAsync(id);
            if (employee == null)
                return NotFound($"Employee with ID:{id} not found.");

            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();

            return Ok();
        }
    }
}

