using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Dtos
{
    public class SearchDto
    {
        public string Querry { get; set; }
        public bool IsSet { get; set; }
        public string Category { get; set; }
        public double MaxPrice { get; set; }
        public double MinPrice { get; set; }
        public string City { get; set; }
    }
}
