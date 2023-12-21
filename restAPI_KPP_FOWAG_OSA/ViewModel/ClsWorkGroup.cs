using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsWorkGroup
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        public IEnumerable<TBL_R_WORK_GROUP> Get_WorkGroup()
        {
            var data = db.TBL_R_WORK_GROUPs.ToList();
            return data;
        }

        public TBL_R_WORK_GROUP Get_WorkGroup_ByID(int id)
        {
            var data = db.TBL_R_WORK_GROUPs.Where(a => a.ID == id).FirstOrDefault();
            return data;
        }

        public void Create_WorkGroup(TBL_R_WORK_GROUP tbl)
        {
            TBL_R_WORK_GROUP data = new TBL_R_WORK_GROUP();
            data.Dstrct = tbl.Dstrct;
            data.WorkGroup = tbl.WorkGroup;
            db.TBL_R_WORK_GROUPs.InsertOnSubmit(data);
            db.SubmitChanges();
        }

        public void Update_WorkGroup(TBL_R_WORK_GROUP tbl)
        {
            TBL_R_WORK_GROUP data = db.TBL_R_WORK_GROUPs.Where(a => a.ID == tbl.ID).FirstOrDefault();
            data.WorkGroup = tbl.WorkGroup;
            data.Dstrct = tbl.Dstrct;
            db.SubmitChanges();
        }

        public void Delete_WorkGroup(int id)
        {
            TBL_R_WORK_GROUP data = db.TBL_R_WORK_GROUPs.Where(a => a.ID == id).FirstOrDefault();
            db.TBL_R_WORK_GROUPs.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        public IEnumerable<VW_DSTRCTCODE> Get_District()
        {
            var data = db.VW_DSTRCTCODEs.ToList();
            return data;
        }
    }
}