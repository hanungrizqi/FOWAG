using System.Web;
using System.Web.Mvc;

namespace KPP_FOWAG_OSA
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
