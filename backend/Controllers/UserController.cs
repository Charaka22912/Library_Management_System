using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BCrypt.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/users")]

    public class UsersController : ControllerBase
    {
        private readonly LibraryContext _context;

        public UsersController(LibraryContext context)
        {
            _context = context;
        }

        //endpoint to get all users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        //Endpoint to delete a user by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User deleted successfully" });
        }

        // Endpoint to register a new user
        [HttpPost("register")]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User registered successfully" });
        }


        // Endpoint to check if a username exists
        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsername(string username)
        {
            var exists = await _context.Users.AnyAsync(u => u.Username == username);
            return Ok(new { exists });
        }

        // Endpoint to login a user
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password)) // verify password
            {
                return BadRequest(new { message = "Invalid username or password" });
            }

            var response = new
            {
                message = "Login successful",
                username = user.Username,
                userType = user.UserType,
                userId = user.Id
            };
            Console.WriteLine(user.Id);
            return Ok(response);
        }


        // Endpoint to get user profile by ID
        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetUserProfile(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user); // return all user fields
        }

        // Endpoint to update user details
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // <-- This returns detailed validation errors
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.FullName = updatedUser.FullName;
            user.Address = updatedUser.Address;
            user.Nic = updatedUser.Nic;
            user.Dob = updatedUser.Dob;
            user.UserType = updatedUser.UserType;
            user.Password = updatedUser.Password;
            user.EmployeeID = updatedUser.EmployeeID;
            user.Username = updatedUser.Username;

            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully" });
        }


    }
}