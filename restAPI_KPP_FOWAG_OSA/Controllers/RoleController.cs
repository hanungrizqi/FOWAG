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
    [RoutePrefix("api/Role")]
    public class RoleController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsRole cls = new ClsRole();

        [HttpGet]
        [Route("Get_Role")]
        public IHttpActionResult GetDataRole()
        {
            var data = cls.Get_Role();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_RoleNew")]
        public IHttpActionResult GetDataRole_New(string nrp)
        {
            var nrpNew = "";

            if (nrp.Length > 7)
            {
                nrpNew = nrp.Substring(nrp.Length - 7);
            }
            else
            {
                nrpNew = nrp;
            }
            var data = cls.Get_RoleNew(nrpNew);

            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_Role_ByID")]
        public IHttpActionResult Get_Role_ByID(int id)
        {
            var data = cls.Get_Role_ByID(id);
            return Ok(new { Data = data });
        }

        [HttpPost]
        [Route("Create_Role")]
        public IHttpActionResult Create_Role(TBL_M_ROLE tbl)
        {
            try
            {
                cls.Create_Role(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
        
        [HttpPost]
        [Route("Update_Role")]
        public IHttpActionResult Update_Role(TBL_M_ROLE tbl)
        {
            try
            {
                cls.Update_Role(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
        
        [HttpPost]
        [Route("Delete_Role")]
        public IHttpActionResult Delete_Role(int id)
        {
            try
            {
                cls.Delete_Role(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
    }
}
