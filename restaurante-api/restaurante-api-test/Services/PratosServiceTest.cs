using Xunit;
using System.Linq;
using RestauranteApi.Models;
using System.Collections.Generic;
using RestauranteApi.Services.Implementations;
using RestauranteApi.Exceptions;
using System;

namespace RestauranteApiTest {
    public class PratosServiceTest {

        private void CarregaPratos(Context context) {
            context.Restaurantes.AddRange(new List<Restaurante> {
                new Restaurante { Id = 1, Nome = "Restaurante 1" }
            });
            context.Pratos.AddRange(new List<Prato> {
                new Prato { Id = 1, Nome = "Prato 1", Preco = 1, RestauranteId = 1 },
                new Prato { Id = 2, Nome = "Prato 2", Preco = 2, RestauranteId = 1 }
            });
            context.SaveChanges();
        }
        
        [Fact]
        public void Query_PratosExistentes_RetornaPratosComRestaurantesCarregados() {
            using (var context = new Context(Util.GetDbOptions())) {
                // Arrange
                CarregaPratos(context);
                PratosService pratosService = new PratosService(context);

                // Act
                var retorno = pratosService.Query();

                // Assert
                Assert.Equal(2, retorno.Count());
                Assert.True(retorno.All(prato => prato.Restaurante != null && prato.Restaurante.Id == 1));
            }
        }
        
        [Fact]
        public void Find_PratoExistente_RetornaPratoComRestauranteCarregado() {
            using (var context = new Context(Util.GetDbOptions())) {
                // Arrange
                CarregaPratos(context);
                PratosService pratosService = new PratosService(context);

                // Act
                var retorno = pratosService.Find(1);

                // Assert
                Assert.NotNull(retorno);
                Assert.Equal(1, retorno.Id);
                Assert.Equal("Prato 1", retorno.Nome);
                Assert.NotNull(retorno.Restaurante);
                Assert.Equal("Restaurante 1", retorno.Restaurante.Nome);
            }
        }

        [Fact]
        public void Find_PratoNaoEncontrado_ThrowsNotFoundException() {
            using (var context = new Context(Util.GetDbOptions())) {
                // Arrange
                CarregaPratos(context);
                PratosService pratosService = new PratosService(context);

                // Act & Asssert
                Exception ex = Assert.Throws<NotFoundException>(() => pratosService.Find(5));
                Assert.Equal("Prato não Localizado.", ex.Message);
            }
        }
    }
}