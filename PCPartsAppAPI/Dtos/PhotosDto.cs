using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCPartsAppAPI.Dtos
{
    public class PhotosDto
    {
        public int AnnouncementId { get; set; }
        public IFormFile[] ImagePaths { get; set; }
    }
}
