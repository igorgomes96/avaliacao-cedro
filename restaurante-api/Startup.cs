using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RestauranteApi.Middleware;
using RestauranteApi.Models;
using RestauranteApi.Services.Implementations;
using RestauranteApi.Services.Interfaces;

namespace RestauranteApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Context>(opt =>
            {
                opt.UseInMemoryDatabase("restaurante");
            });

            services.AddScoped(typeof(ICrudService<>), typeof(CrudService<>));
            services.AddScoped<IRestaurantesService, RestaurantesService>();
            services.AddScoped<IPratosService, PratosService>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Context context)
        {
            SeedData(context);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpErrorMiddleware();
            app.UseMvc();
        }


        private void SeedData(Context context) {
            context.Restaurantes.AddRange(new List<Restaurante> {
                new Restaurante { Id = 1, Nome = "Restaurante 1" },
                new Restaurante { Id = 2, Nome = "Restaurante 2" }
            });
            context.Pratos.AddRange(new List<Prato> {
                new Prato { Id = 1, RestauranteId = 1, Nome = "Prato 1" },
                new Prato { Id = 2, RestauranteId = 2, Nome = "Prato 2" },
            });
            context.SaveChanges();
        }
    }
}
