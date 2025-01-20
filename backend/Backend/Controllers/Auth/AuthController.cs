using Backend.Constant;
using Backend.Controllers.Auth.Dto;
using Backend.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IDbConnection _dbConnection;
        private readonly IConfiguration _configuration;

        public AuthController(IDbConnection dbConnection, IConfiguration configuration)
        {
            _dbConnection = dbConnection;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password) || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new ResultObject { Success = false, Message = "Field missing." });
            }

            User existingUser = await _dbConnection.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Username = @Username OR Email = @Email",
                new { Username = request.Username, Email = request.Email });

            if (existingUser != null)
            {
                return BadRequest(new ResultObject { Success = false, Message = "User with this username or email already exists." });
            }

            string passwordHash = HashPassword(request.Password);

            int result = await _dbConnection.ExecuteAsync(
                "INSERT INTO Users (Username, PasswordHash, Email) VALUES (@Username, @PasswordHash, @Email)",
                new { Username = request.Username, PasswordHash = passwordHash, Email = request.Email });

            if (result > 0)
            {
                existingUser = await _dbConnection.QueryFirstOrDefaultAsync<User>(
                "SELECT Id, Username, Email FROM Users WHERE Username = @Username OR Email = @Email",
                new { Username = request.Username, Email = request.Email });

                return Ok(new ResultObject { Result = existingUser, Success = true, Message = "User registered successfully." });
            }

            return StatusCode(500, new ResultObject { Success = false, Message = "Failed to register user." });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            User user = await _dbConnection.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Username = @Username",
                new { Username = request.Username });

            if (user == null)
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Invalid username or password." });
            }

            if (!VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Invalid username or password." });
            }

            string token = GenerateJwtToken(user);

            var result = new
            {
                data = new
                {
                    username = user.Username,
                    email = user.Email,
                },
                authorization = new
                {
                    token
                }
            };

            return Ok(new ResultObject { Result = result, Success = true });
        }

        private string HashPassword(string password)
        {
            using SHA256 sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            string hash = HashPassword(password);
            return hash == storedHash;
        }

        private string GenerateJwtToken(User user)
        {
            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("UserId", user.Id.ToString())
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
