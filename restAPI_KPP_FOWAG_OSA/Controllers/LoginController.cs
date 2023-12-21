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
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        [HttpPost]
        [Route("Get_Login")]
        public IHttpActionResult Get_Login(ClsLogin param)
        {
            bool remarks = false;
            try
            {
                ClsTempUser nrp = new ClsTempUser();

                bool status = param.Login();

                //bool status = true;
                if (status == true)
                {
                    nrp = param.GetDataEmployee(param.Role);
                    remarks = true;
                }
                else
                {
                    remarks = false;
                }

                return Ok(new { Data = nrp, Remarks = remarks });
            }
            catch (Exception)
            {

                return Ok(remarks);
            }

        }


    }
}
