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
    [RoutePrefix("api/WorkGroup")]
    public class WorkGroupController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsWorkGroup cls = new ClsWorkGroup();

        [HttpGet]
        [Route("Get_WorkGroup")]
        public IHttpActionResult GetDataWorkGroup()
        {
            var data = cls.Get_WorkGroup();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_WorkGroup_ByID")]
        public IHttpActionResult Get_WorkGroup_ByID(int id)
        {
            var data = cls.Get_WorkGroup_ByID(id);
            return Ok(new { Data = data });
        }

        [HttpPost]
        [Route("Create_WorkGroup")]
        public IHttpActionResult Create_WorkGroup(TBL_R_WORK_GROUP tbl)
        {

            try
            {
                var cek = db.TBL_R_WORK_GROUPs.Where(a => a.WorkGroup == tbl.WorkGroup && a.Dstrct == tbl.Dstrct).FirstOrDefault();

                if (cek == null)
                {
                    cls.Create_WorkGroup(tbl);

                    return Ok(new { Remarks = true, Message = "" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Work Group Already Exist !" });
                }

            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_WorkGroup")]
        public IHttpActionResult Update_WorkGroup(TBL_R_WORK_GROUP tbl)
        {
            try
            {
                cls.Update_WorkGroup(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_WorkGroup")]
        public IHttpActionResult Delete_WorkGroup(int id)
        {
            try
            {
                cls.Delete_WorkGroup(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpGet]
        [Route("Get_District")]
        public IHttpActionResult GetDistrict()
        {
            var data = cls.Get_District();
            return Ok(new { Data = data.AsQueryable() });
        }

    }
}
