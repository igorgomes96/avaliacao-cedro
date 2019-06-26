using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestauranteApi.Exceptions
{
    public class DuplicatedException : CustomException
    {
        public DuplicatedException() : base("Registro duplicado!") { }

        public DuplicatedException(string message): base(message) { }
    }
}
