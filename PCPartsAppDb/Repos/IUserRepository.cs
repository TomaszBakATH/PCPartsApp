using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);

        User GetById(int id);
    }
}
