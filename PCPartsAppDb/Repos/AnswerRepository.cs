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
        public Answer AddAnswer(Answer answer)
        {
            _context.Answers.Add(answer);
            answer.Id = _context.SaveChanges();

            return answer;
        }

        public void DeleteAnswer(int id)
        {
            try
            {
                var entity = _context.Answers.FirstOrDefault(x => x.Id == id);
                _context.Answers.Remove(entity);
            }
            catch (Exception)
            {}
        }

        public Answer EditAnswer(Answer answer)
        {
            var entity = _context.Answers.FirstOrDefault(x => x.Id == answer.Id);
            if(entity != null)
            {
                entity = answer;
                _context.SaveChanges();

                return answer;
            }
            return null;
        }

        public Answer GetAnswerById(int id)
        {
            throw new NotImplementedException();
        }

        public Answer GetAnswerByQuestion(int id)
        {
            throw new NotImplementedException();
        }
    }
}
