using Microsoft.EntityFrameworkCore;
using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
using PCPartsAppDb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly PcPartsContext _context;
        public AnnouncementRepository(PcPartsContext context)
        {
            _context = context;
        }
        public Announcement GetAnnouncementById(int id)
        {

            var announcement = _context.Announcements
                .Include(a => a.Owner)
                .Include(b => b.Product)
                .ThenInclude(x => x.Params)
                .Include(b => b.Product)
                .ThenInclude(x => x.Category)
                .Include(b => b.ImagePath)
                .FirstOrDefault(x => x.Id == id);
            //var announcement = _context.Announcements.FirstOrDefault(x => x.Id == id);
            return announcement;
        }
        public List<Announcement> GetAnnouncementsByOwnerId(int id)
        {
            var announcements = _context.Announcements.Where(x => x.OwnerId == id).ToList();

            return announcements;
        }
        public Announcement AddAnnouncement(Announcement announcement)
        {
            foreach (var item in announcement.Product)
            {
                item.Category = _context.Categories.FirstOrDefault(x => x.Id == item.Category.Id);
            }
            _context.Announcements.Add(announcement);
            announcement.Id = _context.SaveChanges();

            return announcement;
        }

        public void CloseAnnouncement(int id)
        {
            var status = _context.Statuses.FirstOrDefault(x => x.Name == Statuses.Closed.ToString());
            _context.Announcements.FirstOrDefault(x => x.Id == id).Status = status;

            _context.SaveChanges();
        }

        public Announcement EditAnnouncement(Announcement announcement)
        {
            var entity = _context.Announcements.FirstOrDefault(x => x.Id == announcement.Id);

            if (entity != null)
            {
                entity = announcement;

                _context.SaveChanges();
            }

            return announcement;
        }

        public bool IsOwner(User user, int id)
        {
            var announcement = _context.Announcements.FirstOrDefault(x => x.Id == id);
            if (announcement != null && announcement.OwnerId == user.Id)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Announcement> SearchAnnouncements(string querry, bool isSet,string category, double maxPrice,string city, double minPrice=0)
        {
            var result = _context.Announcements.Include(x => x.ImagePath).Where(x=>x.Status.Name==Statuses.Open.ToString());
            if (!String.IsNullOrEmpty(querry))
            {
                result = result.Where(x => x.Title.ToLower().Contains(querry.ToLower())
                            || x.Description.ToLower().Contains(querry.ToLower())
                            || x.Product.Any(x => x.Name.ToLower().Contains(querry.ToLower()))
                            || x.Product.Any(x => x.Params.Any(y => y.Name.ToLower().Contains(querry.ToLower()))));
            }
            if (isSet)
            {
                result = result.Where(x => x.Product.Count() > 1);
            }
            if (!String.IsNullOrEmpty(category))
            {
                // result = result.Where(x => x.Product.Count() == 1 && x.Product.First().Category.Name == category);               
                result = result.Where(x => x.Product.Any(x=>x.Category.Name==category));
            }
                if (!String.IsNullOrEmpty(city))
            {
                result = result.Where(x => x.Owner.City.ToLower()==city.ToLower());
            }
            //if (maxPrice > 0)
            //{
            //    result = result.Where(x => x.Price < maxPrice && x.OwnerId > minPrice);
            //}
            //else
            //{
            //    result = result.Where(x => x.Price > minPrice);
            //}

            return result.ToList();

        }

        public List<Announcement> GetAnnouncements(int ammount = 0)
        {

            if (ammount < 1 || _context.Announcements.Count() < ammount)
            {
                return _context.Announcements.Include(x=>x.ImagePath).Where(x => x.Status.Name == Statuses.Open.ToString()).ToList();
            }
            else
            {
                return _context.Announcements.Include(x => x.ImagePath).Where(x => x.Status.Name == Statuses.Open.ToString()).Take(ammount).ToList();
            }
        }

        public List<Category> GetCategories()
        {
            return _context.Categories.ToList();
        }

        public void AddPhoto(int id, List<string> paths)
        {
            var addPaths = new List<ImagePath>();
            var announcement = _context.Announcements.FirstOrDefault(x => x.Id == id);
            foreach (var item in paths)
            {
                addPaths.Add(new ImagePath
                {
                    Announcement = announcement,
                    Path = item
                });
            }

            _context.ImagePaths.AddRange(addPaths);
            _context.SaveChanges();
        }
    }
}
