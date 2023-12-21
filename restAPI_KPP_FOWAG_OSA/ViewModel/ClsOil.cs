using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FormsAuth;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsOil
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        public int id { get; set; }
        public int oil_brand { get; set; }

        public int oil_type { get; set; }

        public int oil_spec { get; set; }

        public IEnumerable<VW_OIL> Get_Oil()
        {
            var data = db.VW_OILs.ToList();
            return data;
        }

        public IEnumerable<TBL_R_OilBrand> Get_OilBrand()
        {
            var data = db.TBL_R_OilBrands.ToList();
            return data;
        }

        public TBL_R_OilBrand Get_OilBrand_ByID(int id)
        {
            var data = db.TBL_R_OilBrands.Where(a => a.Id_Brand == id).FirstOrDefault();
            return data;
        }

        public void Create_OilBrand(TBL_R_OilBrand tbl)
        {
            var cek = db.TBL_R_OilBrands.Where(a => a.OilBrand == tbl.OilBrand).FirstOrDefault();

            if (cek == null)
            {
                TBL_R_OilBrand data = new TBL_R_OilBrand();
                data.OilBrand = tbl.OilBrand;
                db.TBL_R_OilBrands.InsertOnSubmit(data);
                db.SubmitChanges();
            }

        }

        public void Update_OilBrand(TBL_R_OilBrand tbl)
        {
            TBL_R_OilBrand data = db.TBL_R_OilBrands.Where(a => a.Id_Brand == tbl.Id_Brand).FirstOrDefault();
            data.OilBrand = tbl.OilBrand;
            db.SubmitChanges();
        }

        public void Delete_OilBrand(int id)
        {
            TBL_R_OilBrand data = db.TBL_R_OilBrands.Where(a => a.Id_Brand == id).FirstOrDefault();
            db.TBL_R_OilBrands.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        public VW_OIL Get_Oil_ByID(int id)
        {
            var data = db.VW_OILs.Where(a => a.Id_Spec == id).FirstOrDefault();
            return data;
        }

        public void Create_Oil(TBL_R_OIL tbl)
        {
            var cek = db.VW_OILs.Where(a => a.OilBrand == tbl.OilBrand && a.OilType == tbl.OilType && a.OilSpec == tbl.OilSpec).FirstOrDefault();

            if (cek == null)
            {
                TBL_R_OIL data = new TBL_R_OIL();
                data.OilBrand = tbl.OilBrand;
                data.OilType = tbl.OilType;
                data.OilSpec = tbl.OilSpec;
                db.TBL_R_OILs.InsertOnSubmit(data);
                db.SubmitChanges();
            }
            
        }

        public void Update_Oil(TBL_R_OIL tbl)
        {
            TBL_R_OIL data = db.TBL_R_OILs.Where(a => a.Id == tbl.Id).FirstOrDefault();
            data.OilBrand = tbl.OilBrand;
            data.OilType = tbl.OilType;
            data.OilSpec = tbl.OilSpec;
            db.SubmitChanges();
        }

        public void Delete_Oil(int id)
        {
            TBL_R_OIL data = db.TBL_R_OILs.Where(a => a.Id == id).FirstOrDefault();
            db.TBL_R_OILs.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        public IEnumerable<VW_OILBRANDTYPE> Get_OilType_All()
        {
            var data = db.VW_OILBRANDTYPEs.ToList();
            return data;
        }

        public IEnumerable<TBL_R_OilType> Get_DD_OilType()
        {
            var data = db.TBL_R_OilTypes.ToList();
            return data;
        }

        public IEnumerable<VW_OILBRANDTYPE> Get_OilType(string oilbrand)
        {
            var data = db.VW_OILBRANDTYPEs.Where(x => x.OilBrand == oilbrand).ToList();
            return data;
        }

        public VW_OILBRANDTYPE Get_OilType_ByID(int id)
        {
            var data = db.VW_OILBRANDTYPEs.Where(a => a.Id_Type == id).FirstOrDefault();
            return data;
        }

        //public void Create_OilType(TBL_R_OilType tbl)
        //{
        //    var data = Get_OilBrand(tbl.);

        //    TBL_R_OilType data = new TBL_R_OilType();
        //    data.OilType = tbl.OilType;
        //    db.TBL_R_OilTypes.InsertOnSubmit(data);
        //    db.SubmitChanges();
        //}

        public void Create_OilType(string oilType , string oilBrand)
        {
            var cekBrand = db.TBL_R_OilBrands.Where(a => a.OilBrand == oilBrand).FirstOrDefault();

            TBL_R_OilType data = new TBL_R_OilType();
            data.OilType = oilType;
            data.Id_Brand = cekBrand.Id_Brand;
            db.TBL_R_OilTypes.InsertOnSubmit(data);
            db.SubmitChanges();
        }

        public void Update_OilType(string oilType, string oilBrand, int id)
        {
            var cekBrand = db.TBL_R_OilBrands.Where(a => a.OilBrand == oilBrand).FirstOrDefault();

            TBL_R_OilType data = db.TBL_R_OilTypes.Where(a => a.Id_Type == id).FirstOrDefault();
            data.OilType = oilType;
            data.Id_Brand = cekBrand.Id_Brand;
            db.SubmitChanges();
        }

        public void Delete_OilType(int id)
        {
            TBL_R_OilType data = db.TBL_R_OilTypes.Where(a => a.Id_Type == id).FirstOrDefault();
            db.TBL_R_OilTypes.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        public IEnumerable<VW_OIL> Get_OilSpec_All()
        {
            var data = db.VW_OILs.ToList();
            return data;
        }

        public IEnumerable<VW_OIL> Get_OilSpec(string oiltype)
        {
            var data = db.VW_OILs.Where(x => x.OilType == oiltype ).ToList();
            return data;
        }

        public VW_OIL Get_OilSpec_ByID(int id)
        {
            var data = db.VW_OILs.Where(a => a.Id_Spec == id).FirstOrDefault();
            return data;
        }

        //public void Create_OilSpec(TBL_R_OilSpec tbl)
        //{
        //    TBL_R_OilSpec data = new TBL_R_OilSpec();
        //    data.OilSpec = tbl.OilSpec;
        //    db.TBL_R_OilSpecs.InsertOnSubmit(data);
        //    db.SubmitChanges();
        //}

        public void Create_OilSpec(string oilType, string oilBrand, string oilSpec)
        {
            var cekBrand = db.TBL_R_OilBrands.Where(a => a.OilBrand == oilBrand).FirstOrDefault();
            var cekType = db.TBL_R_OilTypes.Where(a => a.OilType == oilType).FirstOrDefault();

            TBL_R_OilSpec data = new TBL_R_OilSpec();
            data.OilSpec = oilSpec;
            data.Id_Brand = cekBrand.Id_Brand;
            data.Id_Type = cekType.Id_Type;
            db.TBL_R_OilSpecs.InsertOnSubmit(data);
            db.SubmitChanges();
        }

        public void Update_OilSpec(string oilType, string oilBrand, string oilSpec, int id)
        {
            var cekBrand = db.TBL_R_OilBrands.Where(a => a.OilBrand == oilBrand).FirstOrDefault();
            var cekType = db.TBL_R_OilTypes.Where(a => a.OilType == oilType).FirstOrDefault();

            TBL_R_OilSpec data = db.TBL_R_OilSpecs.Where(a => a.Id_Spec == id).FirstOrDefault();
            data.OilSpec = oilSpec;
            data.Id_Brand = cekBrand.Id_Brand;
            data.Id_Type = cekType.Id_Type;
            db.SubmitChanges();
        }

        public void Delete_OilSpec(int id)
        {
            TBL_R_OilSpec data = db.TBL_R_OilSpecs.Where(a => a.Id_Spec == id).FirstOrDefault();
            db.TBL_R_OilSpecs.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

    }
}