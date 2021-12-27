using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb
{
    public enum Statuses
    {
        Open,
        Closed,
        Removed
    }
    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
