using EmpManagement.Methods;
using EmpManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EmpManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public ResponseModel login(User user)
        {
            string query = "Get_Employee_Login";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@userName", user.userName));
            sql_parameter.Add(new SqlParameter("@password", user.password));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            if (dt.Rows.Count > 0)
                return ResponseHelper.GetSuccessResponse(user);
            else
                return ResponseHelper.GetFailureResponse(null);

        }
    }
}
