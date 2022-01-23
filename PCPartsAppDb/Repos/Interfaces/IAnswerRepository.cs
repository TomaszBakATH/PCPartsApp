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
        Answer AddAnswer(Answer answer, int id);
        void DeleteAnswer(int id);
    }
}
