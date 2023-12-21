using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;


namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsReviewPAP
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        DB_PLANT_BCSDataContext bcs = new DB_PLANT_BCSDataContext();

        public string Lab { get; set; }
        public string LabNumber { get; set; }
        public string District { get; set; }
        public string UnitModel { get; set; }
        public string UnitNumber { get; set; }
        public string Component { get; set; }
        public string UnitHM { get; set; }
        public string OilHM { get; set; }
        public string OilChanged { get; set; }
        public string OilType { get; set; }

        public string OilBrand { get; set; }
        public string SamplingDate { get; set; }
        public string ReceivedDate { get; set; }
        public string DateReported { get; set; }
        public string Condition { get; set; }
        public float Pb { get; set; }
        public float Fe { get; set; }
        public float Al { get; set; }
        public float Cu { get; set; }
        public float Cr { get; set; }
        public float Sn { get; set; }
        public float Ni { get; set; }
        public float Si { get; set; }
        public float Na { get; set; }
        public float Mg { get; set; }
        public float Zn { get; set; }
        public float Mo { get; set; }
        public float Ca { get; set; }
        public float P { get; set; }
        public float B { get; set; }
        public float PQ { get; set; }
        public float TBN { get; set; }
        public float TAN { get; set; }
        public float Soot { get; set; }
        public float OXI { get; set; }
        public float Glycol { get; set; }
        public float Fuel { get; set; }
        public float Visc { get; set; }
        public float WaterContent { get; set; }
        public string Comment { get; set; }

        public string Created_By { get; set; }
        public DateTime Created_Date { get; set; }

        //public IEnumerable<VW_REVIEWPAP> GetReviewPAP(string Lab)
        //{
        //    var data = db.VW_REVIEWPAPs.Where(x => x.Lab == Lab).OrderByDescending(x => x.Created_Date).Take(3000).ToList();
        //    return data;
        //}

        public IEnumerable<VW_DATAALL> GetReviewPAP(string Lab)
        {
            var data = db.VW_DATAALLs.Where(x => x.Lab == Lab).Take(3000).ToList();
            return data;
        }

        public IEnumerable<VW_DATAALL> GetReviewPAP_Filter(string distrik, string unitmodel, string comp, string unitnumber, string lab)
        {
            
            if (distrik != null && unitmodel != null && comp != null && unitnumber != null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel && x.ComponentCode == comp && x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik != null && unitmodel == null && comp == null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp == null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.UnitModel == unitmodel).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp != null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.ComponentCode == comp).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp == null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.UnitNumber == unitnumber).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp == null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.Lab == lab).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp == null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel /*&& x.ComponentCode == comp && x.UnitNumber == unitnumber && x.Lab == lab*/).ToList();
                return data;
            }
            else if (distrik != null && unitmodel == null && comp != null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.ComponentCode == comp ).ToList();
                return data;
            }
            else if (distrik != null && unitmodel == null && comp == null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik  && x.UnitNumber == unitnumber).ToList();
                return data;
            }
            else if (distrik != null && unitmodel == null && comp == null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp != null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x =>  x.UnitModel == unitmodel && x.ComponentCode == comp).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp == null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.UnitModel == unitmodel  && x.UnitNumber == unitnumber ).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp == null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x =>  x.UnitModel == unitmodel  && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp != null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.ComponentCode == comp && x.UnitNumber == unitnumber).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp != null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x =>  x.ComponentCode == comp && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp == null && unitnumber != null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x =>  x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp != null && unitnumber == null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel && x.ComponentCode == comp).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp == null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel  && x.UnitNumber == unitnumber ).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp == null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel  && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp != null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel && x.ComponentCode == comp && x.UnitNumber == unitnumber ).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp == null && unitnumber != null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel  && x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik != null && unitmodel != null && comp != null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.UnitModel == unitmodel && x.ComponentCode == comp  && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik != null && unitmodel == null && comp != null && unitnumber != null && lab == null)
            {
                var data = db.VW_DATAALLs.Where(x => x.DSTRCT == distrik && x.ComponentCode == comp && x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp != null && unitnumber != null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x =>  x.UnitModel == unitmodel && x.ComponentCode == comp && x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel == null && comp != null && unitnumber != null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.ComponentCode == comp && x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp == null && unitnumber != null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.UnitModel == unitmodel && x.UnitNumber == unitnumber && x.Lab == lab).ToList();
                return data;
            }
            else if (distrik == null && unitmodel != null && comp != null && unitnumber == null && lab != null)
            {
                var data = db.VW_DATAALLs.Where(x => x.UnitModel == unitmodel && x.ComponentCode == comp  && x.Lab == lab).ToList();
                return data;
            }
            else
            {
                var data = db.VW_DATAALLs.ToList();
                return data;
            }
            
        }

        //public IEnumerable<VW_REGISTER_BACKLOG> GetBacklog(string Lab)
        //{
        //    var data = db.VW_REGISTER_BACKLOGs.Where(x => x.Lab == Lab).OrderByDescending(x => x.Created_Date).Take(3000).ToList();
        //    return data;
        //}

        public IEnumerable<VW_REVIEW_OSAPAMA> GetReviewPAP_OSA(string Lab)
        {
            var data = db.VW_REVIEW_OSAPAMAs.OrderByDescending(x => x.DateReported).ToList();
            return data;
        }
    }
}