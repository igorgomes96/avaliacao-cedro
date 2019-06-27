using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System;
using RestauranteApi.Dto;

namespace RestauranteApi.Filters
{
    public class PaginationAttribute : ResultFilterAttribute
    {
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