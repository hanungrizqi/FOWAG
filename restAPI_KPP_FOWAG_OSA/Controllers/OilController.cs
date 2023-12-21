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
    [RoutePrefix("api/Oil")]
    public class OilController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        ClsOil cls = new ClsOil();



        [HttpGet]
        [Route("Get_Oil")]
        // GET: Oil
        public IHttpActionResult Get_Oil()
         {
            var data = cls.Get_Oil();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_OilBrand")]
        // GET: Oil
        public IHttpActionResult Get_OilBrand()
        {
            var data = cls.Get_OilBrand();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_DD_OilType")]
        // GET: Oil
        public IHttpActionResult Get_OilType()
        {
            var data = cls.Get_DD_OilType();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_OilBrand_ByID")]
        public IHttpActionResult Get_OilBrand_ByID(int id)
        {
            var data = cls.Get_OilBrand_ByID(id);
            return Ok(new { Data = data });
        }

        [HttpPost]
        [Route("Create_OilBrand")]
        public IHttpActionResult Create_OilBrand(TBL_R_OilBrand tbl)
        {
            try
            {
                var cek = db.TBL_R_OilBrands.Where(a => a.OilBrand == tbl.OilBrand).FirstOrDefault();

                if (cek == null)
                {
                    cls.Create_OilBrand(tbl);
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Brand Already Exist !" });
                }

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_OilBrand")]
        public IHttpActionResult Update_OilBrand(TBL_R_OilBrand tbl)
        {
            try
            {
                var cek = db.TBL_R_OilBrands.Where(a => a.OilBrand == tbl.OilBrand).FirstOrDefault();

                if (cek == null)
                {
                    cls.Update_OilBrand(tbl);
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Brand Already Exist !" });
                }

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_OilBrand")]
        public IHttpActionResult Delete_OilBrand(int id)
        {
            try
            {
                cls.Delete_OilBrand(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpGet]
        [Route("Get_Oil_ByID")]
        public IHttpActionResult Get_Oil_ByID(int id)
        {
            var data = cls.Get_Oil_ByID(id);
            return Ok(new { Data = data });
        }

        [HttpPost]
        [Route("Create_Oil")]
        public IHttpActionResult Create_Oil(TBL_R_OIL tbl)
        {
            try
            {
                var cek = db.TBL_R_OILs.Where(a => a.OilBrand == tbl.OilBrand && a.OilType == tbl.OilType && a.OilSpec == tbl.OilSpec).FirstOrDefault();

                if (cek == null)
                {
                    cls.Create_Oil(tbl);
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Already Exist !" });
                }

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_Oil")]
        public IHttpActionResult Update_Oil(TBL_R_OIL tbl)
        {
            try
            {
                var cek = db.TBL_R_OILs.Where(a => a.OilBrand == tbl.OilBrand && a.OilType == tbl.OilType && a.OilSpec == tbl.OilSpec).FirstOrDefault();

                if (cek == null)
                {
                    cls.Update_Oil(tbl);
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Already Exist !" });
                }

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_Oil")]
        public IHttpActionResult Delete_Oil(int id)
        {
            try
            {
                cls.Delete_Oil(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpGet]
        [Route("Get_OilType_All")]
        // GET: Oil
        public IHttpActionResult Get_OilType_All()
        {
            //int brand = Int32.Parse(oilbrand);
            var data = cls.Get_OilType_All();
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_OilType")]
        // GET: Oil
        public IHttpActionResult Get_OilType(string oilbrand)
        {
            //int brand = Int32.Parse(oilbrand);
            var data = cls.Get_OilType(oilbrand);
            return Ok(new { Data = data.AsQueryable() });
        }


        [HttpGet]
        [Route("Get_OilType_ByID")]
        public IHttpActionResult Get_OilType_ByID(int id)
        {
            var data = cls.Get_OilType_ByID(id);
            return Ok(new { Data = data });
        }

        //[HttpPost]
        //[Route("Create_OilType")]
        //public IHttpActionResult Create_OilType(TBL_R_OilType tbl)
        //{
        //    try
        //    {

        //        cls.Create_OilType(tbl);

        //        return Ok(new { Remarks = true, Message = "" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(new { Remarks = false, Message = ex.Message.ToString() });
        //    }
        //}

        [HttpPost]
        [Route("Create_OilType")]
        public IHttpActionResult Create_OilType(string oilType, string oilBrand)
        {

            try
            {
                var cek = db.VW_OILBRANDTYPEs.Where(a => a.OilBrand == oilBrand && a.OilType == oilType).FirstOrDefault();

                if (cek == null)
                {
                    cls.Create_OilType(oilType, oilBrand);

                    return Ok(new { Remarks = true, Message = "" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Type Already Exist !" });
                }
                
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_OilType")]
        public IHttpActionResult Update_OilType(string oilType, string oilBrand, int id)
        {
            try
            {
                var cek = db.VW_OILBRANDTYPEs.Where(a => a.OilBrand == oilBrand && a.OilType == oilType).FirstOrDefault();

                if (cek == null)
                {
                    cls.Update_OilType(oilType, oilBrand, id);

                    return Ok(new { Remarks = true, Message = "" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Type Already Exist !" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_OilType")]
        public IHttpActionResult Delete_OilType(int id)
        {
            try
            {
                cls.Delete_OilType(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpGet]
        [Route("Get_OilSpec")]
        // GET: Oil
        public IHttpActionResult Get_OilSpec(string oiltype)
        {
            //int type = Int32.Parse(oiltype);
            var data = cls.Get_OilSpec(oiltype);
            return Ok(new { Data = data.AsQueryable() });
        }

        [HttpGet]
        [Route("Get_OilSpec_All")]
        // GET: Oil
        public IHttpActionResult Get_OilSpec_All()
        {
            //int brand = Int32.Parse(oilbrand);
            var data = cls.Get_OilSpec_All();
            return Ok(new { Data = data.AsQueryable() });
        }


        [HttpGet]
        [Route("Get_OilSpec_ByID")]
        public IHttpActionResult Get_OilSpec_ByID(int id)
        {
            var data = cls.Get_OilSpec_ByID(id);
            return Ok(new { Data = data });
        }

        //[HttpPost]
        //[Route("Create_OilSpec")]
        //public IHttpActionResult Create_OilSpec(TBL_R_OilSpec tbl)
        //{
        //    try
        //    {
        //        cls.Create_OilSpec(tbl);

        //        return Ok(new { Remarks = true, Message = "" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(new { Remarks = false, Message = ex.Message.ToString() });
        //    }
        //}

        [HttpPost]
        [Route("Create_OilSpec")]
        public IHttpActionResult Create_OilSpec(string oilType, string oilBrand, string oilSpec)
        {
            try
            {
                var cek = db.VW_OILs.Where(a => a.OilSpec == oilSpec && a.OilBrand == oilBrand && a.OilType == oilType).FirstOrDefault();

                if (cek == null)
                {
                    cls.Create_OilSpec(oilType, oilBrand, oilSpec);

                    return Ok(new { Remarks = true, Message = "" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Spec Already Exist !" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Update_OilSpec")]
        public IHttpActionResult Update_OilSpec(string oilType, string oilBrand, string oilSpec, int id)
        {
            try
            {

                var cek = db.VW_OILs.Where(a => a.OilSpec == oilSpec && a.OilBrand == oilBrand && a.OilType == oilType).FirstOrDefault();

                if (cek == null)
                {
                    cls.Update_OilSpec(oilType, oilBrand, oilSpec,id);

                    return Ok(new { Remarks = true, Message = "" });
                }
                else
                {
                    return Ok(new { Remarks = false, Message = "Data Oil Spec Already Exist !" });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Route("Delete_OilSpec")]
        public IHttpActionResult Delete_OilSpec(int id)
        {
            try
            {
                cls.Delete_OilSpec(id);

                return Ok(new { Remarks = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new { Remarks = false, Message = ex.Message.ToString() });
            }
        }
    }
}