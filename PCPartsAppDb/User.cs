using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Nickname { get; set; }
        public string City { get; set; }
        public IEnumerable<Announcement> Announcements { get; set; } = new List<Announcement>();
        public DateTime Birthdate { get; set; }
        public DateTime JoinDate { get; set; }
    }
}
