using RestauranteApi.Models;
using System.Linq;

namespace RestauranteApi.Services.Interfaces {
    public interface IRestaurantesService: ICrudService<Restaurante>
    {
        IQueryable<Restaurante> QueryByNome(string nome);
    }
}