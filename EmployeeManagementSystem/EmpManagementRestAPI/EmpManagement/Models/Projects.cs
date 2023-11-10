using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpManagement.Models
{
    public class Projects
    {
        public int projectId { get; set; }
        public string projectName { get; set; }
        public string description { get; set; }
        public DateTime projectStartDate { get; set; }
        public DateTime estimatedEndDate { get; set; }
        public int projectStatusId { get; set; }
        public string projectStatus { get; set; }

        public List<ProjectEmployees> projectEmployees { get; set; }
    }
    public class ProjectEmployees
    {
        public int employeeId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public bool isManager { get; set; }
        public int projectId { get; set; }
    }
}
