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
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }
        public IEnumerable<Question> Questions { get; set; } = new List<Question>();
        public DateTime AddDate { get; set; }
        public DateTime? CloseDate { get; set; }

        //statusy
    }
}
