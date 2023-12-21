using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsUser
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        public int ID_ROLE { get; set; }
        public int ID_ROLE_LAMA { get; set; }
        public string Username { get; set; }

        public IEnumerable<VW_DETAIL_KARYAWAN> Get_User()
        {
            var data = db.VW_DETAIL_KARYAWANs.ToList();
            return data;
        }
        
        public IEnumerable<VW_KARYAWAN_PLANT> Get_UserPlant()
        {
            var data = db.VW_KARYAWAN_PLANTs.ToList();
            return data;
        }
        
        public IEnumerable<VW_KARYAWAN_PLANT> Get_UserPlantById(string nrp)
        {
            var data = db.VW_KARYAWAN_PLANTs.Where(a => a.EMPLOYEE_ID == nrp);
            return data;
        }
        
        public IEnumerable<VW_M_USER> Get_User_Akses()
        {
            var data = db.VW_M_USERs.ToList();
            return data;
        }
        
        public VW_M_USER Get_User_Akses_ByID(TBL_M_USER tbl)
        {
            var data = db.VW_M_USERs.Where(a => a.EMPLOYEE_ID == tbl.Username && a.ID_Role == tbl.ID_Role).FirstOrDefault();
            return data;
        }

        public void Assign_User(TBL_M_USER tbl)
        {
            TBL_M_USER data = new TBL_M_USER();
            data.ID_Role = tbl.ID_Role;
            data.Username = tbl.Username;
            db.TBL_M_USERs.InsertOnSubmit(data);
            db.SubmitChanges();
        }

        public void Update_Assign_User(ClsUser tbl)
        {
            var cekUser = db.TBL_M_USERs.Where(a => a.ID_Role == tbl.ID_ROLE_LAMA && a.Username == tbl.Username).FirstOrDefault();
            cekUser.ID_Role = tbl.ID_ROLE;
            db.SubmitChanges();
        }
        
        public void Delete_Assign_User(TBL_M_USER tbl)
        {
            var cekUser = db.TBL_M_USERs.Where(a => a.ID_Role == tbl.ID_Role && a.Username == tbl.Username).FirstOrDefault();
            db.TBL_M_USERs.DeleteOnSubmit(cekUser);
            db.SubmitChanges();
        }
    }
}