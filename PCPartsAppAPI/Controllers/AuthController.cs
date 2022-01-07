using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCPartsAppAPI.Dtos;
using PCPartsAppAPI.Helpers;
using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using PCPartsAppDb.Repos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {

        private static PcPartsContext _context;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AuthController(PcPartsContext context, IUserRepository userRepository, JwtService jwtService, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _userRepository = userRepository;
            _jwtService = jwtService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto dto)
        {
            var user = new User
            {
                Email = dto.Email,
                City = dto.City,
                Name=dto.Name,
                LastName = dto.LastName,
                Nickname = dto.Nickname,
                Birthdate = DateTime.Now,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                ImagePath = await SaveImage(dto.Image)
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
                name = user.Name,
                message = "success"
            });
        }
       
        [HttpGet("user")]
        public IActionResult UserCheck()
        {
            var user = Check();
            if(user != null)
            {
                return Ok(user);
            }
            else
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

        User Check()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _userRepository.GetById(userId);

                return user;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName += DateTime.Now.ToString("yymssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
