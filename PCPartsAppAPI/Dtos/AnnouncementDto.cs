using PCPartsAppAPI.Models;
using PCPartsAppDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Dtos
{
    public class AnnouncementDto
    {
        public string Title { get; set; }
        public IEnumerable<Product> Product { get; set; }
        public string Description { get; set; }
        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }
        public IEnumerable<Question> Questions { get; set; }
        public DateTime AddDate { get; set; }
        public int StatusId { get; set; }
        public virtual Status Status { get; set; }
    }
}
