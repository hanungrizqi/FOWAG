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
    [RoutePrefix("api/SampleDueDate")]
    public class SampleDueDateController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsSampleDueDate cls = new ClsSampleDueDate();

        [HttpGet]
        [Route("Get_SampleDueDate")]
        public IHttpActionResult GetDataSampleDueDate(string role)
        {
            var data = cls.Get_SampleDueDate();

            if (role == "5")
            {
                data = data.Where(x => x.Status == "Printed" || x.Status == "On Lab").ToList();
            }


            return Ok(new { Data = data });
        }
        
        [HttpGet]
        [Route("Get_UnitHM")]
        public IHttpActionResult Get_UnitHM()
        {
            var data = cls.Get_UnitHM();
            return Ok(data);
        }

        [HttpGet]
        [Route("Get_LastLabNumber")]
        public IHttpActionResult Get_LastLabNumber(string id)
        {
            var data = cls.Get_LastLabNumber(id);
            return Ok(data);
        }

        [HttpGet]
        [Route("Cek_LastLabNumber")]
        public IHttpActionResult Cek_LastLabNumber(string labnumber, string wo, string dstrct, string compcode, string complbl)
        {
            var data = cls.cek_labnumber(wo, dstrct, compcode, complbl);
            return Ok(data);
        }

        [HttpGet]
        [Route("Get_SampleDueDateUN_ByID")]
        public IHttpActionResult Get_SampleDueDateUN_ByID(string wo, string dstrct)
        {
            var data = cls.Get_SampleDueDateUN_ByID(wo, dstrct);
            //var status = data.Status;
            //ViewBag.Status = status;
            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("Get_SampleDueDate_ByID")]
        public IHttpActionResult Get_SampleDueDate_ByID(string wo, string dstrct, string compcode, string complbl)
        {
            var data = cls.Get_SampleDueDate_ByID(wo, dstrct, compcode, complbl);
            //var status = data.Status;
            //ViewBag.Status = status;
            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("Get_SampleDueDateNew_ByID")]
        public IHttpActionResult Get_SampleDueDateNew_ByID(string labnum)
        {
            var data = cls.Get_SampleDueDateNew_ByID(labnum);
            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("Get_Review_ByID")]
        public IHttpActionResult Get_Review_ByID(string labnum)
        {
            try
            {
                var cek = db.VW_REVIEW_LABNUMBERs.Where(a => a.LabNumber == labnum).FirstOrDefault();
                
                if (cek != null)
                {
                    var data = cls.Get_Review_ByID(labnum);
                    
                    return Ok(new { Data = data, Remarks = true, Message = "Success" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Lab Number Not Found" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Create_SampleDueDate")]
        public IHttpActionResult Create_SampleDueDate(TBL_T_SAMPLE_DUE_DATE tbl)
        {
            try
            {
                cls.Create_SampleDueDate(tbl);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("UpdateSts_SampleDueDate")]
        public IHttpActionResult UpdateSts_SampleDueDate(string labnumber)
        {
            try
            {
                cls.UpdateSts_SampleDueDate(labnumber);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_status")]
        public IHttpActionResult Update_status(string labnumber)
        {
            try
            {
                var cek = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == labnumber).FirstOrDefault();

                if (cek != null)
                {
                    cls.Update_status(labnumber);

                    return Ok(new { Remarks = true, Message = "Success" });
                }
                else
                {

                    return Ok(new { Remarks = false, Message = "Lab Number Not Found" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
        
        [HttpPost]
        [Route("Print_Sample")]
        public IHttpActionResult Print_Sample(string labNumber, string printer)
        {
            try
            {
                cls.Print_Sample(labNumber, printer);

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

        //friska 
        [HttpGet]
        [Route("Get_SampleCreate")]
        public IHttpActionResult Get_SampleCreate(string role)
        {
            var data = cls.Get_SampleCreate();

            //if (role == "5")
            //{
            //    data = data.Where(x => x.Status == "Printed" || x.Status == "On Lab").ToList();
            //}


            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("Get_SampleUpdate")]
        public IHttpActionResult Get_SampleUpdate(string role)
        {
            var data = cls.Get_SampleUpdate();

            if (role == "5")
            {
                data = data.Where(x => x.Status == "Printed" || x.Status == "On Lab").ToList();
            }


            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("Get_SampleUpdate_ByID")]
        public IHttpActionResult Get_SampleUpdate_ByID(string wo, string dstrct, string compcode, string complbl)
        {
            var data = cls.Get_SampleUpdate_ByID(wo, dstrct, compcode, complbl);
            //var status = data.Status;
            //ViewBag.Status = status;
            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("Get_CompCode")]
        public IHttpActionResult GetCompCode(string unitmodel)
        {
            var data = cls.Get_CompCode(unitmodel);
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_Printer")]
        public IHttpActionResult GetPrinter(string district = "")
        {
            var data = cls.Get_Printer(district);
            return Ok(new { Data = data.AsQueryable() });
        }
    }
}
