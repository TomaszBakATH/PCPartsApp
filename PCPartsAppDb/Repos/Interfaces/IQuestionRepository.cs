using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public interface IQuestionRepository
    {
        Question GetQuestionById(int id);
        Question GetQuestionByAnnouncementId(int id);
        Question AddQuestion(Question question);
        bool EditQuestion(Question question);
        void DeleteQuestion(int id);
    }
}
