using System.Linq;
using RestauranteApi.Models;
using RestauranteApi.Services.Interfaces;

namespace RestauranteApi.Services.Implementations {
    public class RestaurantesService: CrudService<Restaurante>, IRestaurantesService {

        public RestaurantesService(Context db): base(db) { }

        public IQueryable<Restaurante> QueryByNome(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
                return base.Query();
            nome = nome.ToLower();
            return base.Query(r => r.Nome.ToLower().Contains(nome));
        }
    }
}
