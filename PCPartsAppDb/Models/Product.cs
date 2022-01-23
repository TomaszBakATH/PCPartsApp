using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public int AnnouncementId { get; set; }
        public virtual Announcement Announcement { get; set; }
        public IEnumerable<Parameter> Params { get; set; } = new List<Parameter>();
    }
}
