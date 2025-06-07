using System;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public DateTime Dob { get; set; }
        public string Nic { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}