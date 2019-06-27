using System.Linq;
using RestauranteApi.Models;
using RestauranteApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using RestauranteApi.Exceptions;

namespace RestauranteApi.Services.Implementations {
    public class PratosService: CrudService<Prato>, IPratosService {

        private readonly Context _db;
        public PratosService(Context db): base(db) {
            _db = db;
        }

        /// <summary>
        /// Retorna todos os pratos cadastrados, e carregada os restaurantes relacionados para cada registro.
        /// </summary>
        /// <returns></returns>
        public override IQueryable<Prato> Query() {
            return base.Query().Include(p => p.Restaurante);
        }

        /// <summary>
        /// Retorna o Prato pelo Id, com o restaurante relacionadado carregado.
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public override Prato Find(params object[] key) {
            Prato prato = base.Find(key);
            if (prato == null) throw new NotFoundException("Prato não Localizado.");
            _db.Entry(prato).Reference(p => p.Restaurante).Load();
            return prato; 
        }
    }
}
