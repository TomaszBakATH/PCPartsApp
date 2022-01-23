using Microsoft.EntityFrameworkCore;
using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using PCPartsAppDb.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly PcPartsContext _context;
        public QuestionRepository(PcPartsContext context)
        {
            _context = context;
        }
        public Question AddQuestion(Question question, int userId, int annId)
        {
            question.Announcement = _context.Announcements.FirstOrDefault(x => x.Id == annId);
            var q = _context.Users.FirstOrDefault(x => x.Id == userId);
            question.Questioner = q;
            _context.Questions.Add(question);
            _context.SaveChanges();
            question.Id = _context.Questions.Where(x => x.AnnouncementId == annId).ToList().LastOrDefault().Id;


            return question;
        }

        public void DeleteQuestion(int id)
        {
            var q = _context.Questions.FirstOrDefault(x => x.Id == id);
            var ans = _context.Answers.Where(x => x.QuestionId == id).ToList();
            _context.Answers.RemoveRange(ans);
            _context.Questions.Remove(q);
            _context.SaveChanges();
        }

        public List<QuestionHelper> GetQuestions(int id)
        {
            var results = _context.Questions.Where(x => x.AnnouncementId == id).Include(x => x.Questioner);
            var res = results.Select(y => new QuestionHelper { Question = y, Answer = _context.Answers.FirstOrDefault(x => x.QuestionId == y.Id) }).ToList();
            return res;
        }
    }
}
