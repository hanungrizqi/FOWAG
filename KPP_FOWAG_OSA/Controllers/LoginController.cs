using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KPP_FOWAG_OSA.ViewModel;

namespace KPP_FOWAG_OSA.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            Session["Web_Link"] = System.Configuration.ConfigurationManager.AppSettings["WebApp_Link"].ToString();
            return View();
        }

        public JsonResult MakeSession(ClsTempUser param)
        {
            Session["Web_Link"] = System.Configuration.ConfigurationManager.AppSettings["WebApp_Link"].ToString();
            Session["Nrp"] = param.Nrp;
            Session["ID_Role"] = param.ID_Role;
            Session["Name"] = param.Name;

            return Json(JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            Session.RemoveAll();

            return RedirectToAction("Index", "Login");
        }
    }
}