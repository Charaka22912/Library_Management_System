using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db")); // Configure SQLite database

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()); // Allow all origins, headers, and methods
});

builder.Services.AddControllers(); // Add services for controllers
builder.Services.AddEndpointsApiExplorer(); // Add services for API endpoint exploration
builder.Services.AddSwaggerGen(); // Add Swagger for API documentation

var app = builder.Build();

app.UseSwagger(); // Enable Swagger middleware
app.UseSwaggerUI(); // Enable Swagger UI

app.UseCors("AllowAll"); // Use the CORS policy defined above

app.UseHttpsRedirection(); // Enable HTTPS redirection
app.UseAuthorization(); // Enable authorization middleware
app.MapControllers(); // Map controllers to routes
app.Run(); // Run the application

