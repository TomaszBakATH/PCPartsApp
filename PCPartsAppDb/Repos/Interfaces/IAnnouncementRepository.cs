using PCPartsAppAPI.Models;
using PCPartsAppDb.Helpers;
using PCPartsAppDb.Models;
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
        List<Category> GetCategories();
        List<Announcement> GetAnnouncementsByOwnerId(int id);
        List<Announcement> SearchAnnouncements(string querry, bool isSet, string category, double maxPrice, string city, double minPrice = 0);
        List<Announcement> GetAnnouncements(int ammount);
        void AddPhoto(int id, List<string> paths);
        Announcement AddAnnouncement(Announcement announcement);
        Announcement EditAnnouncement(Announcement announcement);
        void CloseAnnouncement(int id);
        bool IsOwner(User user, int id);

    }
}
