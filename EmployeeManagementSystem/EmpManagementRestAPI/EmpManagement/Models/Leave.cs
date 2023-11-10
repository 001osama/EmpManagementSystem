using System;
using System.Collections.Generic;

namespace EmpManagement.Models
{

    public class EmployeeLeaves
    {
        public List<EmployeeLeavesByCategory> employeeLeavesByCategory { get; set; }
        public List<EmployeeLeavesDetails> employeeLeavesDetails { get; set; }
        public int employeeId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int totalLeaves { get; set; }
        public string department { get; set; }
        public string employeeCategory { get; set; }
    }
    public class EmployeeLeavesByCategory
    {
        public int leaveCategoryId { get; set; }
        public string leaveCategory { get; set; }
        public int totalLeaves { get; set; }
        public int allowedLeaves { get; set; }
    }
    public class EmployeeLeavesDetails
    {
        public string leaveCategory { get; set; }
        public string reason { get; set; }
        public int noOfDays { get; set; }
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
    }

}
