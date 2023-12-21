using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using KPP_FOWAG_OSA.Models;
using Newtonsoft.Json;

namespace KPP_FOWAG_OSA.Controllers
{
    public class ReviewPAPController : Controller
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        // GET: ReviewPAP
        public ActionResult Index()
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            return View();
        }
        
        public async Task<ActionResult> RegisterBacklog(string labnumber)
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }

            VW_REGISTER_BACKLOG vW_REGISTERs = new VW_REGISTER_BACKLOG();
            //VW_REGISTER vW_REGISTERs = new VW_REGISTER();

            using (var client = new HttpClient())
            {
                //Passing service base url  
                client.BaseAddress = new Uri((string)Session["Web_Link"]);

                client.DefaultRequestHeaders.Clear();
                //Define request data format  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Sending request to find web api REST service resource GetAllEmployees using HttpClient  
                HttpResponseMessage Res = await client.GetAsync("api/RegisterBacklog/GetRegisterBacklog?LabNumber=" + labnumber);

                


                //Checking the response is successful or not which is sent using HttpClient  
                if (Res.IsSuccessStatusCode)
                {
                    //Storing the response details recieved from web api   
                    var ApiResponse = Res.Content.ReadAsStringAsync().Result;
                    var dataaja = ApiResponse;

                    //Deserializing the response recieved from web api and storing into the Employee list  
                    vW_REGISTERs = JsonConvert.DeserializeObject<VW_REGISTER_BACKLOG>(ApiResponse);
                    //vW_REGISTERs = JsonConvert.DeserializeObject<VW_REGISTER>(ApiResponse);
                    ViewBag.backlogBCS = vW_REGISTERs.NoBacklog;

                    ViewBag.nrpGL = vW_REGISTERs.NRPGL;
                    //if (ViewBag.nrpGL == null) {
                    //    ViewBag.nrpGL = "";
                    //}
                    ViewBag.orig = vW_REGISTERs.OriginatorID;

                    ViewBag.DataKary = db.VW_KARYAWAN_PLANTs.ToList();

                    ViewBag.work_group = vW_REGISTERs.WorkGroup;
                    ViewBag.WG = db.VW_WORKGROUP_BACKLOGs.Where(a => a.dstrct_code == vW_REGISTERs.DSTRCT).ToList();



                    //if (vW_REGISTERs.NoBacklog != null)
                    //{
                    //    HttpResponseMessage BCS = await client.GetAsync("api/RegisterBacklog/GetNoBacklogBCS?nobacklog=" + vW_REGISTERs.NoBacklog);

                    //    return RedirectToAction("index", "login");
                    //}

                }

                ViewBag.LabNumber = labnumber;
                
                return View(vW_REGISTERs);
            }
        }
    }
}