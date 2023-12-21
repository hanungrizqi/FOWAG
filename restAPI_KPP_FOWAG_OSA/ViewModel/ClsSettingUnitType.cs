using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsSettingUnitType
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        public IEnumerable<TBL_R_UNIT_TYPE> Get_UnitType()
        {
            var data = db.TBL_R_UNIT_TYPEs.ToList();
            return data;
        }

        public TBL_R_UNIT_TYPE Get_UnitTypeById(int id)
        {
            var data = db.TBL_R_UNIT_TYPEs.Where(a => a.Id == id).FirstOrDefault();
            return data;
        }

        public void Create_UnitType(TBL_R_UNIT_TYPE tbl)
        {
            TBL_R_UNIT_TYPE data = new TBL_R_UNIT_TYPE();
            data.UnitModel = tbl.UnitModel;
            data.Type = tbl.Type;
            data.MaintenanceType = tbl.MaintenanceType;
            data.Component = tbl.Component;
            db.TBL_R_UNIT_TYPEs.InsertOnSubmit(data);
            db.SubmitChanges();
        }

        public void Update_UnitType(TBL_R_UNIT_TYPE tbl)
        {
            TBL_R_UNIT_TYPE data = db.TBL_R_UNIT_TYPEs.Where(a => a.Id == tbl.Id).FirstOrDefault();
            data.UnitModel = tbl.UnitModel;
            data.Type = tbl.Type;
            data.MaintenanceType = tbl.MaintenanceType;
            data.Component = tbl.Component;
            db.SubmitChanges();
        }

        public void Delete_UnitType(int id)
        {
            TBL_R_UNIT_TYPE data = db.TBL_R_UNIT_TYPEs.Where(a => a.Id == id).FirstOrDefault();
            db.TBL_R_UNIT_TYPEs.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        public IEnumerable<VW_COMPCODE> Get_CompCode()
        {
            var data = db.VW_COMPCODEs.ToList();
            return data;
        }

        public IEnumerable<VW_UNIT_MODEL> Get_UnitModel()
        {
            var data = db.VW_UNIT_MODELs.ToList();
            return data;
        }
    }
}