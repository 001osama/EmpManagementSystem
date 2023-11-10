using EmpManagement.Methods;
using EmpManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EmpManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayrollController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PayrollController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public ResponseModel Get_Payroll(SearchReq reqObj)
        {
            string query = "Get_Payroll_List";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@employeeId", reqObj.employeeId));
            sql_parameter.Add(new SqlParameter("@month", reqObj.month));
            sql_parameter.Add(new SqlParameter("@year", reqObj.year));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            List<Payroll> payroll = CommonMethods.ConvertToList<Payroll>(dt);
            return ResponseHelper.GetSuccessResponse(payroll);

        }

        [HttpGet("details")]
        public ResponseModel Get_Payroll_By_Id(int payrollId)
        {
            string query = "Get_Payroll_By_Id";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@payrollId", payrollId));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            List<Payroll> payroll = CommonMethods.ConvertToList<Payroll>(dt);
            return ResponseHelper.GetSuccessResponse(payroll);

        }
    }
}
