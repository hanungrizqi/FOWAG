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
    public class SampleDueDateController : Controller
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        // GET: SampleDueDate
        public ActionResult Index()
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }            
            return View();
        }

        public ActionResult Create()
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            return View();
        }

        public ActionResult Update()
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            return View();
        }
        public ActionResult LabelForm(string wo, string dstrct, string compcode, string complbl)
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            ViewBag.WO = wo;
            ViewBag.District = dstrct;
            ViewBag.CompCode = compcode;
            ViewBag.CompLabel = complbl;

            return View();
        }

        public ActionResult LabelForm_Unschedule(string wo, string dstrct)
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            ViewBag.WO = wo;
            ViewBag.District = dstrct;

            return View();
        }

        public ActionResult LabelFormPrint(string labnum)
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            ViewBag.LabNum = labnum;
            var data = db.VW_REVIEW_LABNUMBERs.Where(a => a.LabNumber == labnum).FirstOrDefault();
            ViewBag.Data_OilType = db.VW_OILBRANDTYPEs.Where(x => x.OilBrand == data.OilBrand).ToList();
            ViewBag.TypeOil = data.OilType;
            ViewBag.Data_OilSpec = db.VW_OILs.Where(x => x.OilType == data.OilType && x.OilBrand == data.OilBrand).ToList();
            ViewBag.SpecOil = data.OilSpec;
            //ViewBag.District = dstrct;
            return View();
        }

        public ActionResult LabelFormOnLab(string labnum)
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            ViewBag.LabNum = labnum;
            var data = db.VW_REVIEW_LABNUMBERs.Where(a => a.LabNumber == labnum).FirstOrDefault();
            ViewBag.Data_OilType = db.VW_OILBRANDTYPEs.Where(x => x.OilBrand == data.OilBrand).ToList();
            ViewBag.TypeOil = data.OilType;
            ViewBag.Data_OilSpec = db.VW_OILs.Where(x => x.OilType == data.OilType && x.OilBrand == data.OilBrand).ToList();
            ViewBag.SpecOil = data.OilSpec;
            //ViewBag.District = dstrct;
            return View();
        }

        public ActionResult LabelFormSaved(string labnum)
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }

            var data = db.VW_REVIEW_LABNUMBERs.Where(a => a.LabNumber == labnum).FirstOrDefault();
            ViewBag.DataKary = db.VW_KARYAWAN_PLANTs.ToList();
            ViewBag.LabNum = labnum;
            ViewBag.nrp = data.NRP;
            ViewBag.Data_OilType = db.VW_OILBRANDTYPEs.Where(x => x.OilBrand == data.OilBrand).ToList();
            ViewBag.TypeOil = data.OilType;
            ViewBag.Data_OilSpec = db.VW_OILs.Where(x => x.OilType == data.OilType && x.OilBrand == data.OilBrand).ToList();
            ViewBag.SpecOil = data.OilSpec;
            
            //ViewBag.District = dstrct;
            return View();
        }

    }
}