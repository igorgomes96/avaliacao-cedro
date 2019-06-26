using System.Linq;
using RestauranteApi.Models;
using RestauranteApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            _db.Entry(prato).Reference(p => p.Restaurante).Load();
            return prato; 
        }
    }
}
