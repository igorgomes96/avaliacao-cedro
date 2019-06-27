using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;
using RestauranteApi.Dto;

namespace RestauranteApi.Filters
{
    public class PaginationAttribute : ResultFilterAttribute
    {

        /// <summary>
        /// Verifica 
        ///  * se o foi passada pela URL uma query param com o par�metro pageSize;
        ///  * se o retorno da Action do Controller � do tipo ObjectResult e esse resultado � um IQueryable.
        /// Se sim, faz a pagina��o dos registros e reescrete o body da requisi��o com um objeto do tipo 
        /// PagedResult, o qual encapsula os registros paginados e as informa��es de pagina��o.
        /// </summary>
        /// <param name="context"></param>
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            try
            {
                var urlQuery = context.HttpContext.Request.Query;
                if (urlQuery.ContainsKey("pageSize") && context.Result is ObjectResult && ((ObjectResult)context.Result).Value is IQueryable)
                {
                    int pageSize = int.Parse(urlQuery["pageSize"]);
                    int pageNumber = 1;
                    if (urlQuery.ContainsKey("pageNumber"))
                        pageNumber = int.Parse(urlQuery["pageNumber"]);

                    if (pageNumber == 0) pageNumber = 1;
                    IQueryable<object> response = ((ObjectResult)context.Result).Value as IQueryable<object>;
                    var rowCount = response.Count();
                    var pageCount = (int)Math.Ceiling((double)rowCount / pageSize);
                    var skip = (pageNumber - 1) * pageSize;
                    ((ObjectResult)context.Result).Value = new PagedResult
                    {
                        CurrentPage = pageNumber,
                        PageCount = pageCount,
                        PageSize = pageSize,
                        TotalRecords = rowCount,
                        Result = response.Skip(skip).Take(pageSize)
                    };
                }
            }
            catch { }
            base.OnResultExecuting(context);
        }
    }
}