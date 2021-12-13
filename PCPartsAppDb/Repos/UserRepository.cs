using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public class UserRepository : IUserRepository
    {
        private readonly PcPartsContext _context;

        public UserRepository(PcPartsContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            _context.Users.Add(user);
            user.Id = _context.SaveChanges();

            return user;
        }

        public User GetByEmail(string email)
        {
            if (IsEmail(email))
            {
                return _context.Users.FirstOrDefault(x => x.Email.ToLower() == email.ToLower());
            }
            else 
            {
                return _context.Users.FirstOrDefault(x => x.Nickname.ToLower() == email.ToLower());
            }

        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        private bool IsEmail(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}
