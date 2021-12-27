using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    public class AnnouncementJson
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<ProductJson> Product { get; set; }
        public string Description { get; set; }
        public int OwnerId { get; set; }
        public User Owner { get; set; }
        public IEnumerable<Question> Questions { get; set; }
        public DateTime AddDate { get; set; }
        public int StatusId { get; set; }
        public StatusJson Status { get; set; }
        public AnnouncementJson(Announcement announcement)
        {

        }
    }

    public class ProductJson
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public CategoryJson Category { get; set; }
        public int AnnouncementId { get; set; }
        public IEnumerable<ParameterJson> Params { get; set; } = new List<ParameterJson>();
    }
    public class CategoryJson
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class StatusJson
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ParameterJson
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class UserJson
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Nickname { get; set; }
        public string City { get; set; }
        public IEnumerable<AnnouncementJson> Announcements { get; set; } = new List<AnnouncementJson>();
        public DateTime Birthdate { get; set; }
        public DateTime JoinDate { get; set; } = DateTime.Now;
    }

    public class QuestionJson
    {
        public int Id { get; set; }
        public int AnnouncementId { get; set; }
        public int? QuestionerId { get; set; }
        public UserJson Questioner { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public AnswerJson Answer { get; set; }
    }

    public class AnswerJson
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public int QuestionId { get; set; }
    }
}
