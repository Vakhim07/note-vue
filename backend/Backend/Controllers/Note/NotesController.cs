using Backend.Constant;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace Backend.Controllers.Note
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly IDbConnection _dbConnection;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NotesController(IDbConnection dbConnection, IHttpContextAccessor httpContextAccessor)
        {
            _dbConnection = dbConnection;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateNote([FromBody] Models.Note request)
        {
            ClaimsPrincipal userSession = _httpContextAccessor.HttpContext.User;

            if (userSession == null)
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Session Expire" });
            }

            if (string.IsNullOrEmpty(request.Title))
            {
                return BadRequest(new ResultObject { Success = false, Message = "Title is required." });
            }

            string sql = "INSERT INTO Notes (Title, Content, CreatedBy, CreatedAt) VALUES (@Title, @Content, @CreatedBy, @CreatedAt)";

            int executeSuccess = await _dbConnection.ExecuteAsync(sql, new
            {
                Title = request.Title,
                Content = request.Content,
                CreatedAt = DateTime.Now,
                CreatedBy = userSession.FindFirst(ClaimTypes.Name)?.Value
            });

            if (executeSuccess > 0)
            {
                return Ok(new ResultObject { Success = true, Message = "Note created successfully." });
            }

            return StatusCode(500, new ResultObject { Success = false, Message = "Failed to create note." });
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            ClaimsPrincipal userSession = _httpContextAccessor.HttpContext.User;

            if (userSession == null)
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Session Expire" });
            }

            string sql = "SELECT * FROM Notes WHERE CreatedBy = @CreatedBy Order by CreatedAt desc";
            IEnumerable<Models.Note> data = await _dbConnection.QueryAsync<Models.Note>(sql, new { CreatedBy = userSession.FindFirst(ClaimTypes.Name)?.Value });

            return Ok(new ResultObject { Result = data, Success = true });
        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get(int id)
        {
            ClaimsPrincipal userSession = _httpContextAccessor.HttpContext.User;

            if (userSession == null)
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Session Expire" });
            }

            string sql = "SELECT * FROM Notes WHERE Id = @Id and CreatedBy = @CreatedBy";
            Models.Note data = await _dbConnection.QueryFirstOrDefaultAsync<Models.Note>(sql, new
            {
                Id = id,
                CreatedBy = userSession.FindFirst(ClaimTypes.Name)?.Value
            });

            if (data == null)
            {
                return NotFound(new ResultObject { Message = "Note not found.", Success = false });

            }
            return Ok(new ResultObject { Result = data, Success = true });
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] Models.Note request)
        {
            ClaimsPrincipal userSession = _httpContextAccessor.HttpContext.User;

            if (userSession == null)
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Session Expire" });
            }

            string sql = "UPDATE Notes SET Title = @Title, Content = @Content, UpdatedAt = @UpdatedAt, UpdatedBy = @UpdatedBy WHERE Id = @Id and CreatedBy = @CreatedBy";

            int executeSuccess = await _dbConnection.ExecuteAsync(sql, new
            {
                Id = request.Id,
                Title = request.Title,
                Content = request.Content,
                UpdatedAt = DateTime.Now,
                CreatedBy = userSession.FindFirst(ClaimTypes.Name)?.Value,
                UpdatedBy = userSession.FindFirst(ClaimTypes.Name)?.Value
            });

            if (executeSuccess > 0)
            {
                return Ok(new ResultObject { Message = "Note updated successfully.", Success = true });
            }

            return NotFound(new ResultObject { Message = "Note not found.", Success = false });
        }

        [HttpGet("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            ClaimsPrincipal userSession = _httpContextAccessor.HttpContext.User;

            if (userSession == null)
            {
                return Unauthorized(new ResultObject { Success = false, Message = "Session Expire" });
            }

            string sql = "DELETE FROM Notes WHERE Id = @Id and CreatedBy = @CreatedBy";

            int executeSuccess = await _dbConnection.ExecuteAsync(sql, new
            {
                Id = id,
                CreatedBy = userSession.FindFirst(ClaimTypes.Name)?.Value,
            });

            if (executeSuccess > 0)
            {
                return Ok(new ResultObject { Message = "Note deleted successfully.", Success = true });
            }

            return NotFound(new ResultObject { Message = "Note not found.", Success = false });
        }

    }
}
