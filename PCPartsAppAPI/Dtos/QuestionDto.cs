using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Dtos
{
    public class QuestionDto
    {
        public int AnnouncementId { get; set; }
        public int QuestionerId { get; set; }
        public string Content { get; set; }
    }
}
