using RestauranteApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RestauranteApiTest
{
    public static class Util
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static DbContextOptions<Context> GetDbOptions() => new DbContextOptionsBuilder<Context>()
                .UseInMemoryDatabase(databaseName: RandomString(10))
                .Options;

    }
}