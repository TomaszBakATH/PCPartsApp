using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly PcPartsContext _context;
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IAnswerRepository _answerRepository;
        private readonly JwtService _jwtService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AnnouncementController(
            IAnswerRepository answerRepository,
            IQuestionRepository questionRepository,
            PcPartsContext context,
            IAnnouncementRepository announcementRepository,
            IUserRepository userRepository,
            JwtService jwtService,
            IWebHostEnvironment hostEnvironment)
        {
            _answerRepository = answerRepository;
            _questionRepository = questionRepository;
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

        [HttpGet("GetUser/{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.Include(x=>x.Announcements).ThenInclude(x=>x.ImagePath).FirstOrDefault(x => x.Id == id);

            return Ok(new
            {
                user = user
            });
        }

        [HttpGet("GetQuestions/{id}")]
        public IActionResult GetQuestions(int id)
        {
            return Ok(new
            {
                questions = _questionRepository.GetQuestions(id)
            });
        }

        [HttpPost("AddQuestion")]
        public IActionResult AddQuestion(QuestionDto questionDto)
        {
            var q = new Question
            {
                CreateDate = DateTime.Now,
                Content= questionDto.Content,             
            };

            return Ok(new
            {
                question = _questionRepository.AddQuestion(q,questionDto.QuestionerId,questionDto.AnnouncementId)
            });
        }

        [HttpPost("DeleteQuestion/{id}")]
        public IActionResult DeleteQuestion(int id )
        {
            _questionRepository.DeleteQuestion(id);
            return Ok(new
            {
                message = "success"
            });
        }

        [HttpPost("AddAnswer")]
        public IActionResult AddAnswer(AnswerDto answerDto)
        {
            var a = new Answer
            {
                Content = answerDto.Content,
                CreateDate = DateTime.Now
            };

            return Ok(new
            {
                answer = _answerRepository.AddAnswer(a, answerDto.QuestionId)
            });
        }

        [HttpPost("DeleteAnswer/{id}")]
        public IActionResult AnswerQuestion(int id)
        {
            _answerRepository.DeleteAnswer(id);
            return Ok(new
            {
                message = "success"
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
        public IActionResult AddAnnouncement( AnnouncementDto announcementDto)
        {
            var user = _userRepository.GetById(announcementDto.OwnerId);
                var announcement = new Announcement
                {
                    AddDate = DateTime.Now,
                    Description = announcementDto.Description,
                    Owner = user,
                    OwnerId = user.Id,
                    Product = announcementDto.Product,
                    Status = _context.Statuses.FirstOrDefault(x => x.Name == Statuses.Open.ToString()),
                    Title = announcementDto.Title,
                    Price = announcementDto.Price
                };
               
                
            return Ok(new
                {
                    announcement = _announcementRepository.AddAnnouncement(announcement)
                });
        }

        [HttpPost("AddPhotos")]
        public async Task<IActionResult> AddPhotos([FromForm]PhotosDto photosDto)
        {
            if(photosDto.ImagePaths.Length != 0 && photosDto.AnnouncementId>1)
            {
                var paths = new List<string>();
                foreach (var item in photosDto.ImagePaths)
                {
                    var i = await SaveImage(item);
                    paths.Add(i);
                }
                _announcementRepository.AddPhoto(photosDto.AnnouncementId, paths);

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        
        }

        [HttpPost("CloseAnnouncement/{id}")]
        public IActionResult CloseAnnouncement(int id)
        {
            _announcementRepository.CloseAnnouncement(id);

            return Ok(new
            {
                message = "success"
            });
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
        [HttpPost("Search")]
        public IActionResult Search(SearchDto searchDto)
        {
            return Ok(new
            {
                announcements = _announcementRepository.SearchAnnouncements(searchDto.Querry, searchDto.IsSet, searchDto.Category, searchDto.MaxPrice,searchDto.City, searchDto.MinPrice)
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
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            return Ok(new
            {
                categories = _announcementRepository.GetCategories()
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
            await Task.Delay(1000);
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
