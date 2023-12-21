using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KPP_FOWAG_OSA.Models;

namespace KPP_FOWAG_OSA.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        [ChildActionOnly]
        public ActionResult Menu()
        {
            if (Session["Nrp"] == null)
            {
                var menu = "";

                return PartialView("SideBar", menu);
            }
            else
            {
                var menu = db.VW_R_MENUs.Where(x => x.ID == Convert.ToInt16(Session["ID_Role"].ToString())).OrderBy(x => x.Order).ToList();
                ViewBag.Sub = db.TBL_R_SUB_MENUs.Where(x => x.Akses.Contains("ALL")).ToList();
                ViewBag.Path = System.Configuration.ConfigurationManager.AppSettings["WebApp_Path"].ToString();
                Session["Path_Website"] = System.Configuration.ConfigurationManager.AppSettings["WebApp_Path"].ToString();
                Session["Web_Link"] = System.Configuration.ConfigurationManager.AppSettings["WebApp_Link"].ToString();

                return PartialView("SideBar", menu);
            }

        }
    }
}