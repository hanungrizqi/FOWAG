using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsMenu
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        public IEnumerable<VW_M_AKSE> Get_AksesMenu()
        {
            var data = db.VW_M_AKSEs.ToList();
            return data;
        }
        public IEnumerable<TBL_R_MENU> Get_Menu()
        {
            var data = db.TBL_R_MENUs.ToList();
            return data;
        }

        public void Create_AksesMenu(TBL_M_AKSE tbl)
        {
            TBL_M_AKSE data = new TBL_M_AKSE();
            data.ID_Role = tbl.ID_Role;
            data.ID_Menu = tbl.ID_Menu;
            db.TBL_M_AKSEs.InsertOnSubmit(data);
            db.SubmitChanges();
        }

        public void Delete_AksesMenu(TBL_M_AKSE tbl)
        {
            var cekUser = db.TBL_M_AKSEs.Where(a => a.ID_Role == tbl.ID_Role && a.ID_Menu == tbl.ID_Menu).FirstOrDefault();
            db.TBL_M_AKSEs.DeleteOnSubmit(cekUser);
            db.SubmitChanges();
        }
    }
}