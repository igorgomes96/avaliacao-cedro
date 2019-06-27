using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestauranteApi.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace RestauranteApi.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class HttpErrorMiddleware
    {
        private readonly RequestDelegate _next;

        public HttpErrorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (NotFoundException ex)
            {
                httpContext.Response.StatusCode = 404;
                await httpContext.Response.WriteAsync(ex.Message);
            }
            catch (DuplicatedException ex)
            {
                httpContext.Response.StatusCode = 409;
                await httpContext.Response.WriteAsync(ex.Message);
            }
            catch (CustomException ex)
            {
                httpContext.Response.StatusCode = 400;
                await httpContext.Response.WriteAsync(ex.Message);
            }
            catch (Exception)
            {
                httpContext.Response.StatusCode = 500;
                await httpContext.Response.WriteAsync("Ocorreu um erro desconhecido!");
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class HttpErrorMiddlewareExtensions
    {
        public static IApplicationBuilder UseHttpErrorMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HttpErrorMiddleware>();
        }
    }
}
