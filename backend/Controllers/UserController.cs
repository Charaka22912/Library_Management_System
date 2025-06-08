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

        [HttpPost("register")]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User registered successfully" });
        }


        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsername(string username)
        {
            var exists = await _context.Users.AnyAsync(u => u.Username == username);
            return Ok(new { exists });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid username or password" });
            }

            var response = new
            {
                message = "Login successful",
                username = user.Username,
                userType = user.UserType  
            };

            return Ok(response);
        }

    }
}