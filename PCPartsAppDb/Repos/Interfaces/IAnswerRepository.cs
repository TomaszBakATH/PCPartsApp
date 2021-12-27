using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public interface IAnswerRepository
    {
        Answer GetAnswerById(int id);
        Answer GetAnswerByQuestion(int id);
        Answer AddAnswer(Answer answer);
        Answer EditAnswer(Answer answer);
        void DeleteAnswer(int id);
    }
}
