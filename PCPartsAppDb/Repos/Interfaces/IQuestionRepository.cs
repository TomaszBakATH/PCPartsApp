using PCPartsAppAPI.Models;
using PCPartsAppDb.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public interface IQuestionRepository
    {
        public List<QuestionHelper> GetQuestions(int id);
        public Question AddQuestion(Question question, int userId, int annId);
        void DeleteQuestion(int id);
    }
}
