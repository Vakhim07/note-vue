namespace Backend.Controllers.Auth.Dto
{
    public class RegisterRequestDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
    public class LoginRequestDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
