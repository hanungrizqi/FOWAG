using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using restAPI_KPP_FOWAG_OSA.Models;
using restAPI_KPP_FOWAG_OSA.ViewModel;
using System.Web;
using System.Net;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Globalization;
using System.Security.Claims;
using System.Threading.Tasks;

namespace restAPI_KPP_FOWAG_OSA.Controllers
{
    [RoutePrefix("api/RegisterBacklog")]
    public class RegisterBacklogController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsRegisterBackLog cls = new ClsRegisterBackLog();
        ClsReviewPAP clsRev = new ClsReviewPAP();

        [HttpGet]
        [Route("GetAddPart")]
        public IHttpActionResult GetAddPart(string search, string district)
        {
            var data = cls.GetAddPart(search, district);
            return Ok(new { Data = data.AsQueryable() });
        }


        [HttpGet]
        [Route("GetRegisterBacklog")]
        public IHttpActionResult GetRegisterBacklog(string LabNumber)
        {
                var data = cls.GetRegisterBacklog(LabNumber);
                return Ok(data);
        }



        [HttpGet]
        [Route("GetLastNoBacklog")]
        public IHttpActionResult GetLastNoBacklog(string id)
        {
            var data = cls.GetLastNoBacklog(id);
            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("GetNoBacklogBCS")]
        public IHttpActionResult GetNoBacklogBCS(string nobacklog)
        {
            var data = cls.GetNoBacklogBCS(nobacklog);
            return Ok(new { bcs = data });
        }

        [HttpGet]
        [Route("GetEditPart")]
        public IHttpActionResult GetEditPart(string id)
        {
            var data = cls.GetEditPart(id);
            return Ok(new { Data = data });
        }

        [HttpGet]
        [Route("GetPart")]
        public IHttpActionResult GetPart(string noBacklog)
        {
            var data = cls.GetPart(noBacklog);
            var databcs = cls.GetNoBacklogBCS(noBacklog);
            return Ok(new { Data = data.AsQueryable(), BCS = databcs });
        }

        [HttpGet]
        [Route("GetWorkGroup")]
        public IHttpActionResult GetWorkGroup(string district)
        {
            var data = cls.GetWorkGroup(district);
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("GetStandarJob")]
        public IHttpActionResult GetStandarJob(string district)
        {
            var data = cls.GetStandarJob(district);
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_ReviewStandarJob")]
        public IHttpActionResult Get_ReviewStandarJob(string district, string stdjob)
        {
            var data = cls.Get_ReviewStandarJob(district, stdjob);
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpPost]
        [Route("Create_Backlog")]
        public IHttpActionResult Create_Backlog(ClsRegisterBackLog clsRB)
        {
            try
            {
                cls.Create_Backlog(clsRB);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Register_BCS")]
        public IHttpActionResult Register_BCS(ClsRegisterBackLog clsRB)
        {
            try
            {
                cls.Register_BCS(clsRB);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        //[HttpPost]
        //[Route("Save_Backlog")]
        //public IHttpActionResult Save_Backlog(ClsRegisterBackLog clsRB)
        //{
        //    try
        //    {
        //        cls.saveBackLog(clsRB);

        //        return Ok(new { Remarks = true, Message = "" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(new { Remarks = false, Message = ex.Message.ToString() });
        //    }
        //}

        [HttpPost]
        [Route("Update_Part")]
        public IHttpActionResult Update_Part(string NoBacklog = "", string PartNo = "", string FigNo = "", int Qty = 0, int IndexNo = 0)
        //public IHttpActionResult Update_Part(ClsRegisterBackLog clsRB)
        {
            try
            {
                //cls.Update_Part(clsRB);
                cls.Update_Part(NoBacklog, PartNo, FigNo, Qty, IndexNo);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_Part")]
        public IHttpActionResult Delete_Part(string id)
        {
            try
            {
                cls.Delete_Part(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpGet]
        [Route("GetReviewPAP")]
        public IHttpActionResult GetReviewPAP(string Lab)
        {
            //try
            //{
                if (Lab == "1")
                {
                    Lab = "Petrolab";
                }
                else if (Lab == "2")
                {
                    Lab = "Technomics";
                }else 
                {
                    Lab = "OSA PAMA";
                }
                //if (Lab == "1")
                //{
                //    Lab = "Petrolab";
                //}
                var data = clsRev.GetReviewPAP(Lab);
                return Ok(new { Data = data.AsQueryable()});
            //}
            //catch (Exception ex)
            //{
            //    return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            //}
        }

        [HttpGet]
        [Route("GetReviewPAP_Filter")]
        public IHttpActionResult GetReviewPAP_Filter(string distrik, string unitmodel, string comp, string unitnumber, string lab)
        {
            if (lab == "1")
            {
                lab = "Petrolab";
            }
            else if (lab == "2")
            {
                lab = "Technomics";
            }
            else if(lab == "3")
            {
                lab = "OSA PAMA";
            }
            else
            {
                lab = null;
            }

            var data = clsRev.GetReviewPAP_Filter(distrik, unitmodel, comp, unitnumber, lab);
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("GetReviewPAP_OSA")]
        public IHttpActionResult GetReviewPAP_OSA(string Lab)
        {
            //try
            //{
                var data = clsRev.GetReviewPAP_OSA(Lab);
                return Ok(new { Data = data.AsQueryable() });
                //return Ok(new { Data = data.AsQueryable(), Remarks = true, Message = "Success" });
            //}
            //catch (Exception ex)
            //{
            //    return Ok(new{Remarks = false,Message = ex.Message.ToString()});
            //}
        
        }

        [HttpGet]
        [Route("Get_Lab")]
        public IHttpActionResult GetDataLab()
        {
            var data = cls.Get_Lab();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_CompCode")]
        public IHttpActionResult GetCompCode()
        {
            var data = cls.Get_CompCode();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_UnitNumber")]
        public IHttpActionResult GetUnitNumber()
        {
            var data = cls.Get_UnitNumber();
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
