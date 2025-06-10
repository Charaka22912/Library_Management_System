namespace backend.Models
{
    public class LoginDto // Represents the data transfer object for user login
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}