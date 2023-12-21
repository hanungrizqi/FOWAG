using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using restAPI_KPP_FOWAG_OSA.ViewModel;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsUser cls = new ClsUser();

        [HttpGet]
        [Route("Get_User")]
        public IHttpActionResult GetDataUser()
        {
            var data = cls.Get_User();
            return Ok(new { Data = data.AsQueryable() });
        }
        
        [HttpGet]
        [Route("Get_UserPlant")]
        public IHttpActionResult Get_UserPlant()
        {
            var data = cls.Get_UserPlant();
            return Ok(new { Data = data.AsQueryable() });
        }
        
        [HttpGet]
        [Route("Get_UserPlantById")]
        public IHttpActionResult Get_UserPlantById(string nrp)
        {
            var data = cls.Get_UserPlantById(nrp);
            return Ok(new { Data = data.AsQueryable() });
        }
        
        [HttpGet]
        [Route("Get_User_Akses")]
        public IHttpActionResult Get_User_Akses()
        {
            var data = cls.Get_User_Akses();
            return Ok(new { Data = data.AsQueryable() });
        }
        
        [HttpPost]
        [Route("Get_User_Akses_ByID")]
        public IHttpActionResult Get_User_Akses_ByID(TBL_M_USER tbl)
        {
            var data = cls.Get_User_Akses_ByID(tbl);
            return Ok(new { Data = data});
        }

        [HttpPost]
        [Route("Assign_User")]
        public IHttpActionResult Assign_User(TBL_M_USER tbl)
        {
            try
            {
                cls.Assign_User(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
        
        [HttpPost]
        [Route("Update_Assign_User")]
        public IHttpActionResult Update_Assign_User(ClsUser tbl)
        {
            try
            {
                cls.Update_Assign_User(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
        
        [HttpPost]
        [Route("Delete_Assign_User")]
        public IHttpActionResult Delete_Assign_User(TBL_M_USER tbl)
        {
            try
            {
                cls.Delete_Assign_User(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
        
    }
}
