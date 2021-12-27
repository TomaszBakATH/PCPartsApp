﻿using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Models
{
    public class ImagePath
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public Announcement Announcement { get; set; }
    }
}
