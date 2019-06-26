using RestauranteApi.Models;
using RestauranteApi.Services.Interfaces;

namespace RestauranteApi.Services.Implementations {
    public class RestaurantesService: CrudService<Restaurante>, IRestaurantesService {

        public RestaurantesService(Context db): base(db) { }
    }
}
