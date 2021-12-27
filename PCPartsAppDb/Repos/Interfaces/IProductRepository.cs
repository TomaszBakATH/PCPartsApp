using PCPartsAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCPartsAppDb.Repos
{
    public interface IProductRepository
    {
        Product GetProductById(int id);
        List<Product> GetProductsByAnnouncementId(int id);
        List<Product> AddProducts(List<Product> products);
        List<Product> EditProducts(List<Product> products);
        void DeleteProduct(int id);
    }
}
