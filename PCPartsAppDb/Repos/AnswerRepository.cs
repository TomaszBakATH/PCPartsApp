using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly PcPartsContext _context;
        public AnswerRepository(PcPartsContext context)
        {
            _context = context;
        }
        public Answer AddAnswer(Answer answer, int id)
        {
            var q = _context.Questions.FirstOrDefault(x => x.Id == id);
            answer.Question = q;
            _context.Answers.Add(answer);
            answer.Id = _context.SaveChanges();

            return answer;
        }

        public void DeleteAnswer(int id)
        {
            var q = _context.Answers.FirstOrDefault(x => x.Id == id);
            _context.Answers.Remove(q);
            _context.SaveChanges();
        }
    }
}
