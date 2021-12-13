using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCPartsAppAPI.Dtos;
using PCPartsAppAPI.Helpers;
using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using PCPartsAppDb.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {

        private static PcPartsContext _context;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthController(PcPartsContext context, IUserRepository userRepository, JwtService jwtService)
        {
            _context = context;
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Email = dto.Email,
                City = dto.City,
                Name=dto.Name,
                LastName = dto.LastName,
                Nickname = dto.Nickname,
                Birthdate = dto.Birthdate,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            
            return Created("success", _userRepository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _userRepository.GetByEmail(dto.Email);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpGet("user")]
        public IActionResult UserCheck()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _userRepository.GetById(userId);

                return Ok(user);
            }catch(Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new{
                message = "success"
            });
        }
    }
}
