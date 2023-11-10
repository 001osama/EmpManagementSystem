using EmpManagement.Methods;
using EmpManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EmpManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProjectsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public ResponseModel Get()
        {
            string JSONString = string.Empty;
            string query = "Get_All_Projects";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);
            DataTable dt = _database.getDataTable(query, null);
            List<Projects> leaves = CommonMethods.ConvertToList<Projects>(dt);
            return ResponseHelper.GetSuccessResponse(leaves);
        }

        [HttpGet("details/{projectId}")]
        public ResponseModel GetProjectDetails(int projectId)
        {
            string JSONString = string.Empty;
            string query = "Get_Projects_Details_By_Id";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@projectId", Convert.ToInt16(projectId)));

            DataSet ds = _database.getDataSet(query, sql_parameter.ToArray());

            Projects project = new Projects();
            project.projectId = Convert.ToInt32(ds.Tables[0].Rows[0]["projectId"]);
            project.projectName = ds.Tables[0].Rows[0]["projectName"].ToString();
            project.description = ds.Tables[0].Rows[0]["description"].ToString();
            project.projectStatusId = Convert.ToInt32(ds.Tables[0].Rows[0]["projectStatusId"]);
            project.projectStatus = ds.Tables[0].Rows[0]["projectStatus"].ToString();
            project.projectStartDate = Convert.ToDateTime(ds.Tables[0].Rows[0]["projectStartDate"]);
            project.estimatedEndDate = Convert.ToDateTime(ds.Tables[0].Rows[0]["estimatedEndDate"].ToString());
            project.projectEmployees = CommonMethods.ConvertToList<ProjectEmployees>(ds.Tables[1]);
            return ResponseHelper.GetSuccessResponse(project);
        }

        [HttpDelete("{projectId}/{employeeId}")]
        public ResponseModel RemoveEmployeeFromProject(int projectId, int employeeId)
        {
            string JSONString = string.Empty;
            string query = "Remove_Employee_From_Project";
            string sqlDataSource = _configuration.GetConnectionString("MyConnection");
            Database _database = new Database(sqlDataSource);

            List<SqlParameter> sql_parameter = new List<SqlParameter>();
            sql_parameter.Add(new SqlParameter("@projectId", Convert.ToInt16(projectId)));
            sql_parameter.Add(new SqlParameter("@employeeId", Convert.ToInt16(employeeId)));

            DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
            object obj = new object();
            return ResponseHelper.GetSuccessResponse(obj);
        }

        [HttpPost("employee")]
        public ResponseModel AddUpdateProjectEmployee(ProjectEmployees req)
        {
            try
            {
                string JSONString = string.Empty;
                string query = "Add_Update_Project_Employee";
                string sqlDataSource = _configuration.GetConnectionString("MyConnection");
                Database _database = new Database(sqlDataSource);

                List<SqlParameter> sql_parameter = new List<SqlParameter>();
                sql_parameter.Add(new SqlParameter("@projectId", Convert.ToInt16(req.projectId)));
                sql_parameter.Add(new SqlParameter("@employeeId", Convert.ToInt16(req.employeeId)));
                sql_parameter.Add(new SqlParameter("@isManager", Convert.ToBoolean(req.isManager)));

                DataTable dt = _database.getDataTable(query, sql_parameter.ToArray());
                object obj = new object();
                return ResponseHelper.GetSuccessResponse(obj);
            }
            catch (Exception ex)
            {
                return ResponseHelper.GetFailureResponse(ex?.Message);
            }
        }
    }
}
