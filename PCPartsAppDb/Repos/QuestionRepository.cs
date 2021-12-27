using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    class QuestionRepository : IQuestionRepository
    {
        private readonly PcPartsContext _context;
        public QuestionRepository(PcPartsContext context)
        {
            _context = context;
        }
        public Question AddQuestion(Question question)
        {
            _context.Questions.Add(question);
            question.Id = _context.SaveChanges();

            return question;
        }
        public void DeleteQuestion(int id)
        {
            var question = _context.Questions.FirstOrDefault(x => x.Id == id);
            _context.Questions.Remove(question);
        }

        public bool EditQuestion(Question question)
        {
            var entity = _context.Questions.FirstOrDefault(x => x.Id == question.Id);
            if (entity != null)
            {
                entity = question;
                _context.SaveChanges();

                return true;
            }
            return false;
        }

        public Question GetQuestionByAnnouncementId(int id)
        {
            return _context.Questions.FirstOrDefault(x => x.AnnouncementId == id);
        }

        public Question GetQuestionById(int id)
        {
            return _context.Questions.FirstOrDefault(x => x.Id == id);
        }
    }
}
