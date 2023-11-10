using Microsoft.AspNetCore.Mvc;
using System.Data;
using Newtonsoft.Json;
using EmpManagement.Methods;
using EmpManagement.Interface;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using System;
using EmpManagement.Models;

namespace EmpManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public string Get()
        {
            string JSONString = string.Empty;
            string query = "Get_All_Employees";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);
            DataTable dt = _database.getDataTable(query, null);
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpGet("details/{employeeId}")]
        public string GetEmployeeDetails(int employeeId)
        {
            string JSONString = string.Empty;
            string query = "Get_Employee_Details_By_Id";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@employeeId", Convert.ToInt16(employeeId)));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpPost]
        public string AddEmployee(Employee request)
        {
            string JSONString = string.Empty;
            string query = "Add_New_Employee";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@firstName", request.firstName));
            sql_parameter.Add(new SqlParameter("@lastName", request.lastName));
            sql_parameter.Add(new SqlParameter("@address", request.address));
            sql_parameter.Add(new SqlParameter("@email", request.email));
            sql_parameter.Add(new SqlParameter("@phoneNumber", request.phoneNumber));
            sql_parameter.Add(new SqlParameter("@dateOfBirth", request.dateOfBirth));
            sql_parameter.Add(new SqlParameter("@departmentId", Convert.ToInt16(request.departmentId)));
            sql_parameter.Add(new SqlParameter("@categoryId", Convert.ToInt16(request.categoryId)));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpPut]
        public string UpdateEmployee(Employee request)
        {
            string JSONString = string.Empty;
            string query = "Update_Employee";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@employeeId", request.employeeId));
            sql_parameter.Add(new SqlParameter("@firstName", request.firstName));
            sql_parameter.Add(new SqlParameter("@lastName", request.lastName));
            sql_parameter.Add(new SqlParameter("@address", request.address));
            sql_parameter.Add(new SqlParameter("@email", request.email));
            sql_parameter.Add(new SqlParameter("@phoneNumber", request.phoneNumber));
            sql_parameter.Add(new SqlParameter("@dateOfBirth", request.dateOfBirth));
            sql_parameter.Add(new SqlParameter("@departmentId", Convert.ToInt16(request.departmentId)));
            sql_parameter.Add(new SqlParameter("@categoryId", Convert.ToInt16(request.categoryId)));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpGet("departments")]
        public string GetDeparts()
        {
            string JSONString = string.Empty;
            string query = "Get_All_Departments";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);
            DataTable dt = _database.getDataTable(query, null);
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpGet("categories")]
        public string GetCategories()
        {
            string JSONString = string.Empty;
            string query = "Get_All_Categories";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);
            DataTable dt = _database.getDataTable(query, null);
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpGet("qualification/{employeeId}")]
        public string GetEmployeeQualification(int employeeId)
        {
            string JSONString = string.Empty;
            string query = "Get_Employee_Qualification";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@employeeId", Convert.ToInt16(employeeId)));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

        [HttpPost("qualification")]
        public string AddUpdateEmployeeQualification(Qualification request)
        {
            string JSONString = string.Empty;
            string query = "Update_Employee_Qualification";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@employeeId", Convert.ToInt16(request.employeeId)));
            sql_parameter.Add(new SqlParameter("@degree", request.degree));
            sql_parameter.Add(new SqlParameter("@marksObtained", request.marksObtained));
            sql_parameter.Add(new SqlParameter("@totalMarks", request.totalMarks));
            sql_parameter.Add(new SqlParameter("@isPositionHolder", request.isPositionHolder));
            sql_parameter.Add(new SqlParameter("@position", Convert.ToInt16(request.position)));
            sql_parameter.Add(new SqlParameter("@dateStarted", request.dateStarted));
            sql_parameter.Add(new SqlParameter("@dateEnded", request.dateEnded));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }

    }

}
