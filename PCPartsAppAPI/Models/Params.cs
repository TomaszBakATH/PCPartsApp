using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Models
{
    public class Params
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
