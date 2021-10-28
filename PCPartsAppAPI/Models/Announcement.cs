using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public string Title { get; set; }
        //public Product Product { get; set; }
        public User Owner { get; set; }
        public DateTime AddDate { get; set; }
        public DateTime? CloseDate { get; set; }
    }
}
