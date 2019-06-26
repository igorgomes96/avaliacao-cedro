using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestauranteApi.Models;
using RestauranteApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PratoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PratosController : ControllerBase
    {
         
        private readonly IPratosService _pratosService;

        public PratosController(IPratosService pratosService) {
            _pratosService = pratosService;
        }

        [HttpGet]
        public IQueryable<Prato> Get() => _pratosService.Query();

        [HttpGet("{id}")]
        public ActionResult<Prato> Get(int id) {
            Prato prato = _pratosService.Find(id);
            if (prato == null) {
                return NotFound("Prato não encontrado!");
            } else {
                return Ok(prato);
            }
        }

        [HttpPost]
        public ActionResult<Prato> Post(Prato prato) => _pratosService.Add(prato);

        [HttpPut("{id}")]
        public ActionResult Put(int id, Prato prato) {
            _pratosService.Update(prato, id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<Prato> Delete(int id) => _pratosService.Delete(id);
    }
}