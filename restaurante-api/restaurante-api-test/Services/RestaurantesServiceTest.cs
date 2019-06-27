using Xunit;
using System.Linq;
using RestauranteApi.Models;
using System.Collections.Generic;
using RestauranteApi.Services.Implementations;
using RestauranteApi.Exceptions;
using System;

namespace RestauranteApiTest {
    public class RestaurantesServiceTest {

        private void CarregaRestaurantes(Context context) {
            context.Restaurantes.AddRange(new List<Restaurante> {
                new Restaurante { Id = 1, Nome = "Restaurante 1" },
                new Restaurante { Id = 2, Nome = "Restaurante 2" },
                new Restaurante { Id = 3, Nome = "Restaurante 3" }
            });
            context.SaveChanges();
        }

        [Fact]
        public void QueryByNome_NomeEmBranco_RetornaTodos() {
            using (var context = new Context(Util.GetDbOptions())) {
                // Arrange
                CarregaRestaurantes(context);
                var restaurantesService = new RestaurantesService(context);

                // Act
                var retorno = restaurantesService.QueryByNome(string.Empty).ToList();

                // Assert
                Assert.Equal(3, retorno.Count());
                Assert.Equal(1, retorno.ElementAt(0).Id);
                Assert.Equal(2, retorno.ElementAt(1).Id);
                Assert.Equal(3, retorno.ElementAt(2).Id);
            }
        }

        [Fact]
        public void QueryByNome_NomeExistenteSemMatchCase_RetornaRestaurantes() {
            using (var context = new Context(Util.GetDbOptions())) {
                // Arrange
                CarregaRestaurantes(context);
                var restaurantesService = new RestaurantesService(context);

                // Act
                var retorno = restaurantesService.QueryByNome("AnTe 2").ToList();

                // Assert
                Assert.Single(retorno);
                Assert.Equal(2, retorno.First().Id);
                Assert.Equal("Restaurante 2", retorno.First().Nome);
            }
        }

        [Fact]
        public void QueryByNome_NomeInexistente_RetornaListaVazia() {
            using (var context = new Context(Util.GetDbOptions())) {
                // Arrange
                CarregaRestaurantes(context);
                var restaurantesService = new RestaurantesService(context);

                // Act
                var retorno = restaurantesService.QueryByNome("AnTe 10");

                // Assert
                Assert.Empty(retorno);
            }
        }
    }
}