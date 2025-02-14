using System;
using ServerApp.Models;

namespace ServerApp.CustomData
{
	public class Data
	{
		private static List<Employee> empData = new List<Employee>()
		{
			new Employee(){ID = 1, Name = "Amit", Age = "25", IsActive = 1},
			new Employee(){ID = 2, Name = "Sumit", Age = "25", IsActive = 1}
		};

		public List<Employee> GetEmployeeData()
		{
			return empData;
		}

	}
}

