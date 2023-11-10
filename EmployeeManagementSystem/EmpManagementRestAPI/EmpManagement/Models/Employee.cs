namespace EmpManagement.Models
{
    public class Employee
    {
        public int employeeId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string dateOfBirth { get; set; }
        public string phoneNumber { get; set; }
        public int categoryId { get; set; }
        public int departmentId { get; set; }
    }

    public class Qualification
    {
        public int employeeId { get; set; }
        public string dateEnded { get; set; }
        public string dateStarted { get; set; }
        public string degree { get; set; }
        public bool isPositionHolder { get; set; }
        public decimal marksObtained { get; set; }
        public int position { get; set; }
        public decimal totalMarks { get; set; }
    }

    public class User
    {
        public string userName { get; set; }
        public string password { get; set; }
    }
}
