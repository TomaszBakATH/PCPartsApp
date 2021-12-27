using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public interface IAnnouncementRepository
    {
        Announcement GetAnnouncementById(int id);
        List<Announcement> GetAnnouncementsByOwnerId(int id);
        List<Announcement> SearchAnnouncements(string querry);
        List<Announcement> GetAnnouncements(int ammount);
        Announcement AddAnnouncement(Announcement announcement);
        Announcement EditAnnouncement(Announcement announcement);
        void CloseAnnouncement(int id);
        bool IsOwner(User user, int id);

    }
}
