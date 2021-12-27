using Microsoft.EntityFrameworkCore;
using PCPartsAppAPI.Models;
using PCPartsAppDb.Context;
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
            var announcement = _context.Announcements.Include(a => a.Owner).Include(b => b.Product).ThenInclude(x => x.Params).Include(b => b.Product).ThenInclude(x => x.Category).FirstOrDefault();

            return announcement;
        }
        public List<Announcement> GetAnnouncementsByOwnerId(int id)
        {
            var announcements = _context.Announcements.Where(x => x.OwnerId == id).ToList();

            return announcements;
        }
        public Announcement AddAnnouncement(Announcement announcement)
        {
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

            if(entity != null)
            {
                entity = announcement;

                _context.SaveChanges();
            }
            
            return announcement;
        }

        public bool IsOwner(User user, int id)
        {
            var announcement = _context.Announcements.FirstOrDefault(x => x.Id == id);
            if(announcement != null && announcement.OwnerId == user.Id)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Announcement> SearchAnnouncements(string querry)
        {
            return _context.Announcements.Where(x => x.Title.Contains(querry) || x.Description.Contains(querry)).ToList();
        }

        public List<Announcement> GetAnnouncements(int ammount = 0)
        {
            
            if (ammount < 1 || _context.Announcements.Count()<ammount)
            {
                return _context.Announcements.ToList();
            }
            else
            {
                return _context.Announcements.Take(ammount).ToList();
            }
        }
    }
}
