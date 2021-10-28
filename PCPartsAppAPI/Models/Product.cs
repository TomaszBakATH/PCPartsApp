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
        public Category Category { get; set; }
        public IEnumerable<Params> Params { get; set; }
    }
}
