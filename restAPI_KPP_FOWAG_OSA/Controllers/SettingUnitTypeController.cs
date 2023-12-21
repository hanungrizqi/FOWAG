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
    [RoutePrefix("api/SettingUnitType")]
    public class SettingUnitTypeController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsSettingUnitType cls = new ClsSettingUnitType();

        [HttpGet]
        [Route("Get_UnitType")]
        public IHttpActionResult Get_UnitType()
        {
            var data = cls.Get_UnitType();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_UnitTypeById")]
        public IHttpActionResult Get_UnitTypeById(int id)
        {
            var data = cls.Get_UnitTypeById(id);
            return Ok(new { Data = data });
        }

        [HttpPost]
        [Route("Create_UnitType")]
        public IHttpActionResult Create_UnitType(TBL_R_UNIT_TYPE tbl)
        {
            try
            {
                var cek = db.TBL_R_UNIT_TYPEs.Where(a => a.UnitModel == tbl.UnitModel && a.Type == tbl.Type && a.MaintenanceType == tbl.MaintenanceType && a.Component == tbl.Component).FirstOrDefault();

                if (cek == null)
                {
                    cls.Create_UnitType(tbl);
                    return Ok(new { Remarks = true, Message = "" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Unit Type Already Exist !" });
                }
           
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_UnitType")]
        public IHttpActionResult Update_UnitType(TBL_R_UNIT_TYPE tbl)
        {
            var cek = db.TBL_R_UNIT_TYPEs.Where(a => a.UnitModel == tbl.UnitModel && a.Type == tbl.Type && a.MaintenanceType == tbl.MaintenanceType && a.Component == tbl.Component).FirstOrDefault();

            if (cek == null)
            {
                cls.Update_UnitType(tbl);
                return Ok(new { Remarks = true, Message = "" });
            }
            else
            {
                return Ok(new { Remarks = false, Message = "Data Unit Type Already Exist !" });
            }
        }

        [HttpPost]
        [Route("Delete_UnitType")]
        public IHttpActionResult Delete_UnitType(int id)
        {
            try
            {
                cls.Delete_UnitType(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpGet]
        [Route("Get_CompCode")]
        public IHttpActionResult GetCompCode()
        {
            var data = cls.Get_CompCode();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_UnitModel")]
        public IHttpActionResult GetUnitModel()
        {
            var data = cls.Get_UnitModel();
            return Ok(new { Data = data.AsQueryable() });
        }
    }
}
