using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.CustomData;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FakeController : Controller
    {
        private readonly Data data = new Data();

        [HttpGet]
        public List<Employee> GetAllEmployees()
        {
            return data.GetEmployeeData();
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployeesById(int id)
        {

            var employee = data.GetEmployeeData().Where( d => d.ID == id);

            if (employee == null)
                return NotFound($"Employee with ID:{id} not found.");

            return Ok(employee);
        }

        [HttpPost]
        public ActionResult<Employee> AddEmployee(Employee emp)
        {
            data.GetEmployeeData().Add(emp);

            return CreatedAtAction(nameof(GetEmployeesById), new { id = emp.ID }, emp);
        }

        [HttpPut("{id}")]
        public List<Employee> UpdateEmployee(int id, Employee emp)
        {

            Employee e = data.GetEmployeeData().Where(d => d.ID == id).FirstOrDefault();
            data.GetEmployeeData().Remove(e);
            data.GetEmployeeData().Add(emp);

            return data.GetEmployeeData();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteEmployee(int id)
        {
            Employee e = data.GetEmployeeData().Where(d => d.ID == id).First();
            data.GetEmployeeData().Remove(e);

            return Ok();
        }
    }
}

