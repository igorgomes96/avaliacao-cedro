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

        public override IQueryable<Prato> Query() {
            return base.Query().Include(p => p.Restaurante);
        }

        public override Prato Find(params object[] key) {
            Prato prato = base.Find(key);
            if (prato == null) throw new NotFoundException("Prato não Localizado.");
            _db.Entry(prato).Reference(p => p.Restaurante).Load();
            return prato; 
        }
    }
}
