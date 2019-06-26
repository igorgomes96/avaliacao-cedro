using Microsoft.EntityFrameworkCore;

namespace RestauranteApi.Models
{
    public class Context : DbContext
    {

        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Restaurante> Restaurantes { get; set; }        
        public virtual DbSet<Prato> Pratos { get; set; }

    }
}
