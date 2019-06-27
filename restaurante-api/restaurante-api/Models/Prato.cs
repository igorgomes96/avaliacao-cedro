namespace RestauranteApi.Models {
    public class Prato {
        public int Id { get; set; }
        public string Nome { get; set; }
        public float Preco { get; set; }
        public int RestauranteId { get; set; }

        public Restaurante Restaurante { get; set; }
    }
}