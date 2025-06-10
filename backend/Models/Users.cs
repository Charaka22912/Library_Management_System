using System;

namespace backend.Models
{
    public class User // Represents a user in the library management system
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public DateTime Dob { get; set; }
        public string Nic { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserType { get; set; }
        public string EmployeeID { get; set; }

    }
}