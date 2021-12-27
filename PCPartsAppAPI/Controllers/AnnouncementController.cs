using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCPartsAppAPI.Dtos;
using PCPartsAppAPI.Helpers;
using PCPartsAppAPI.Models;
using PCPartsAppDb;
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
    public class AnnouncementController : Controller
    {
        private static PcPartsContext _context;
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AnnouncementController(PcPartsContext context, IAnnouncementRepository announcementRepository, IUserRepository userRepository, JwtService jwtService, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _announcementRepository = announcementRepository;
            _jwtService = jwtService;
            _hostEnvironment = hostEnvironment;
            _userRepository = userRepository;
        }

        [HttpGet("Announcement/{id}")]
        public IActionResult GetById(int id)
        {
            var announcement = _announcementRepository.GetAnnouncementById(id);

            return Ok(new
            {
                announcement = announcement
            });
        }

        [HttpGet("UserAnnouncements/{id}")]
        public IActionResult GetByOwnerId(int id)
        {
            var announcements = _announcementRepository.GetAnnouncementsByOwnerId(id);

            return Ok(new
            {
                announcements = announcements
            });
        }

        [HttpPost("AddAnnouncement")]
        public IActionResult AddAnnouncement(AnnouncementDto announcementDto)
        {
            var user = Check();
            if (user != null)
            {
                var announcement = new Announcement
                {
                    AddDate = DateTime.Now,
                    Description = announcementDto.Description,
                    Owner = user,
                    OwnerId = user.Id,
                    Product = announcementDto.Product,
                    Status = _context.Statuses.FirstOrDefault(x => x.Name == Statuses.Open.ToString()),
                    Title = announcementDto.Title
                };
               
                return Ok(new
                {
                    announcement = _announcementRepository.AddAnnouncement(announcement)
                });
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("CloseAnnouncement/{id}")]
        public IActionResult CloseAnnouncement(int id)
        {
            var user = Check();
            if (_announcementRepository.IsOwner(user, id))
            {
                _announcementRepository.CloseAnnouncement(id);

                return Ok(new
                {
                    message = "success"
                });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("EditAnnouncement")]
        public IActionResult EditAnnouncement(Announcement announcement)
        {
            var user = Check();
            if (user!= null && _announcementRepository.IsOwner(user, announcement.Id))
            {
                return Ok(new
                {
                    announcement = _announcementRepository.EditAnnouncement(announcement),
                    message = "success"
                });
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("Search/{querry}")]
        public IActionResult Search(string querry)
        {
            return Ok(new
            {
                announcements = _announcementRepository.SearchAnnouncements(querry)
            });
        }

        [HttpGet("Get/{amount}")]
        public IActionResult Get(int amount)
        {
            return Ok(new
            {
                announcements = _announcementRepository.GetAnnouncements(amount)
            });
        }

        public User Check()
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
