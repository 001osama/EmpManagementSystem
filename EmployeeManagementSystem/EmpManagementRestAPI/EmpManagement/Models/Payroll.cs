using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpManagement.Models
{
    public class SearchReq
    {
        public int employeeId { get; set; }
        public int month { get; set; }
        public int year { get; set; }
    }

    public class Payroll
    {
        public int payrollId { get; set; }
        public int employeeId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string department { get; set; }
        public DateTime date { get; set; }
        public int basicSalary { get; set; }
        public int otherAllowance { get; set; }
        public int utilityAllowance { get; set; }
        public int adtionalAmount { get; set; }
        public int deductions { get; set; }
        public string paymentCategory { get; set; }
    }
}
