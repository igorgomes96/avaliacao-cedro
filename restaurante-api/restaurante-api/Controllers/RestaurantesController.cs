using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestauranteApi.Models;
using RestauranteApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Filters;

namespace RestauranteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantesController : ControllerBase
    {
         
        private readonly IRestaurantesService _restaurantesService;

        public RestaurantesController(IRestaurantesService restaurantesService) {
            _restaurantesService = restaurantesService;
        }

        [HttpGet]
        [Pagination]
        public IQueryable<Restaurante> Get(string nome = null) => _restaurantesService.QueryByNome(nome);

        [HttpGet("{id}")]
        public ActionResult<Restaurante> Get(int id) {
            Restaurante restaurante = _restaurantesService.Find(id);
            if (restaurante == null) {
                return NotFound("Restaurante não encontrado!");
            } else {
                return Ok(restaurante);
            }
        }

        [HttpPost]
        public ActionResult<Restaurante> Post(Restaurante restaurante) => _restaurantesService.Add(restaurante);

        [HttpPut("{id}")]
        public ActionResult Put(int id, Restaurante restaurante) {
            _restaurantesService.Update(restaurante, id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<Restaurante> Delete(int id) => _restaurantesService.Delete(id);
    }
}