using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    public class Question
    {
        public int Id { get; set; }
        public Announcement Announcement { get; set; }
        public User Questioner { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
