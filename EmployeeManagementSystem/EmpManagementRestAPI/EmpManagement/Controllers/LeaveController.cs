using EmpManagement.Methods;
using EmpManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EmpManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LeaveController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public ResponseModel Get()
        {
            string query = "Get_Leaves_Category";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);
            DataTable dt = _database.getDataTable(query, null);
            List<EmployeeLeavesByCategory> leaves = CommonMethods.ConvertToList<EmployeeLeavesByCategory>(dt);
            return ResponseHelper.GetSuccessResponse(leaves);
        }

        [HttpGet("employeeLeaves/{employeeId}")]
        public ResponseModel GetEmployeeLeaves(int employeeId)
        {
            string query = "Get_Employee_Leaves";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@employeeId", Convert.ToInt16(employeeId)));

            DataSet ds = _database.getDataSet(query, sql_parameter.ToArray());

            EmployeeLeaves employeeLeaves = new EmployeeLeaves();
            employeeLeaves.employeeId = Convert.ToInt16(ds.Tables[0].Rows[0]["employeeId"]);
            employeeLeaves.firstName = (ds.Tables[0].Rows[0]["firstName"].ToString());
            employeeLeaves.lastName = (ds.Tables[0].Rows[0]["lastName"].ToString());
            employeeLeaves.totalLeaves = Convert.ToInt16(ds.Tables[0].Rows[0]["totalLeaves"]);
            employeeLeaves.department = (ds.Tables[0].Rows[0]["department"].ToString());
            employeeLeaves.employeeCategory = (ds.Tables[0].Rows[0]["employeeCategory"].ToString());
            employeeLeaves.employeeLeavesByCategory = CommonMethods.ConvertToList<EmployeeLeavesByCategory>(ds.Tables[1]);
            employeeLeaves.employeeLeavesDetails = CommonMethods.ConvertToList<EmployeeLeavesDetails>(ds.Tables[2]);
            //List<EmployeeLeavesDetails> employeeLeavesDetails = new List<EmployeeLeavesDetails>();
            //employeeLeavesDetails = CommonMethods.ConvertToList<EmployeeLeavesDetails>(ds.Tables[2]);

            //JSONString = JsonConvert.SerializeObject(ds);
            //return employeeLeaves;
            return ResponseHelper.GetSuccessResponse(employeeLeaves);
        }
    }
}
