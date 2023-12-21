using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using restAPI_KPP_FOWAG_OSA.Models;
using restAPI_KPP_FOWAG_OSA.ViewModel;

namespace restAPI_KPP_FOWAG_OSA.Controllers
{
    [RoutePrefix("api/Menu")]
    public class MenuController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsMenu cls = new ClsMenu();

        [HttpGet]
        [Route("Get_AksesMenu")]
        public IHttpActionResult Get_AksesMenu()
        {
            var data = cls.Get_AksesMenu();
            return Ok(new { Data = data.AsQueryable(), Total = data.Count()});
        }
        
        [HttpGet]
        [Route("Get_Menu")]
        public IHttpActionResult Get_Menu()
        {
            var data = cls.Get_Menu();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpPost]
        [Route("Create_AksesMenu")]
        public IHttpActionResult Create_AksesMenu(TBL_M_AKSE tbl)
        {
            try
            {
                cls.Create_AksesMenu(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_AksesMenu")]
        public IHttpActionResult Delete_AksesMenu(TBL_M_AKSE tbl)
        {
            try
            {
                cls.Delete_AksesMenu(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
    }
}
