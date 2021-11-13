using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    //public enum Category
    //{
    //    Procesor,
    //    Motherboard,
    //    Case,
    //    RAM,
    //    Disc,
    //    Cooling,
    //    PowerSupply,
    //}
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int AnnouncementId { get; set; }
        public Announcement Announcement { get; set; }
        public IEnumerable<Parameter> Params { get; set; } = new List<Parameter>();
    }
}
