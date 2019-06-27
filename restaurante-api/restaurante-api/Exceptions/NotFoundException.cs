using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestauranteApi.Exceptions
{
    public class NotFoundException : CustomException
    {
        public NotFoundException() : base("Registro não encontrado!") { }
        public NotFoundException(string message): base(message) { }
    }
}
