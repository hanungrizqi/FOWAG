using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FormsAuth;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsRole
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        public int id_role { get; set; }
        public int nama_role { get; set; }

        public IEnumerable<TBL_M_ROLE> Get_Role()
        {
            var data = db.TBL_M_ROLEs.ToList();
            return data;
        }

        public IEnumerable<VW_M_USER> Get_RoleNew(string nrp)
        {
            var data = db.VW_M_USERs.Where(a => a.EMPLOYEE_ID == nrp).ToList();

            
            //if (data.Count == 0)
            //{
            //    var cek = Get_RoleGuest(nrp);
            //    //data = Get_RoleGuest(nrp); 
                
            //}

            return data;
        }

        //public IEnumerable<TBL_M_USER> Get_RoleGuest(string nrp)
        //{
        //    var data = db.TBL_M_USERs.Where(a => a.Username == nrp).ToList();

        //    return data;
        //}

        public TBL_M_ROLE Get_Role_ByID(int id)
        {
            var data = db.TBL_M_ROLEs.Where(a => a.ID == id).FirstOrDefault();
            return data;
        }

        public void Create_Role(TBL_M_ROLE tbl)
        {
            TBL_M_ROLE data = new TBL_M_ROLE();
            data.RoleName = tbl.RoleName;
            db.TBL_M_ROLEs.InsertOnSubmit(data);
            db.SubmitChanges();
        }
                
        public void Update_Role(TBL_M_ROLE tbl)
        {
            TBL_M_ROLE data = db.TBL_M_ROLEs.Where(a => a.ID == tbl.ID).FirstOrDefault();
            data.RoleName = tbl.RoleName;
            db.SubmitChanges();
        }

        public void Delete_Role(int id)
        {
            TBL_M_ROLE data = db.TBL_M_ROLEs.Where(a => a.ID == id).FirstOrDefault();
            db.TBL_M_ROLEs.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        
    }
}