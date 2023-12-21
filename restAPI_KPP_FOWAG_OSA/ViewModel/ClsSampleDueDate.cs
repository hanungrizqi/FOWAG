using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;


namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsSampleDueDate
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        DB_BAR_PRINTINGDataContext dbPrint = new DB_BAR_PRINTINGDataContext();

        public IEnumerable<VW_LABEL_FORM> Get_SampleDueDate()
        {
            var data = db.VW_LABEL_FORMs.OrderByDescending(a => a.LabNumber).ToList();
            return data;
        }

        public VW_NEW_SAMPLE_DUE_DATE_ELLIPSE Get_SampleDueDateUN_ByID(string id, string dstrct)
        {
            var data = db.VW_NEW_SAMPLE_DUE_DATE_ELLIPSEs.Where(a => a.WO == id && a.DSTRCT == dstrct).OrderByDescending(a => a.ComponentCode).FirstOrDefault();
            return data;
        }

        public VW_NEW_LABEL_FORM Get_SampleDueDate_ByID(string id, string dstrct, string compcode, string complbl)
        {
            var label = "";
            var data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct).OrderByDescending(a => a.Component).FirstOrDefault(); ;
            if (complbl.Contains("-"))
            {
                string[] comlblSplit = complbl.Split(new char[] { '-' });
                var complblNew = comlblSplit[1];
                label = complblNew;
                data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == label).OrderByDescending(a => a.Component).FirstOrDefault();
            }
            else
            {
                label = compcode + "-" + complbl;
                data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentJoin == label).OrderByDescending(a => a.Component).FirstOrDefault();
            }

            if (data == null)
            {
                data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == complbl && a.ComponentJoin == null).OrderByDescending(a => a.Component).FirstOrDefault();
            }

            //var data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == label).OrderByDescending(a => a.Component).FirstOrDefault();
            //var data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == label).OrderByDescending(a => a.Component).FirstOrDefault();
            return data;
        }
        //public VW_NEW_LABEL_NOCOMP Get_SampleDueDate_ByID(string id, string dstrct, string compcode, string complbl)
        //{
        //    var label = "";
        //    var data = db.VW_NEW_LABEL_NOCOMPs.Where(a => a.WO == id && a.DSTRCT == dstrct).OrderByDescending(a => a.ComponentCode).FirstOrDefault(); ;
        //    if (complbl.Contains("-"))
        //    {
        //        string[] comlblSplit = complbl.Split(new char[] { '-' });
        //        var complblNew = comlblSplit[1];
        //        label = complblNew;
        //        data = db.VW_NEW_LABEL_NOCOMPs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode).OrderByDescending(a => a.ComponentCode).FirstOrDefault();
        //    }
        //    else
        //    {
        //        label = compcode + "-" + complbl;
        //        data = db.VW_NEW_LABEL_NOCOMPs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentJoin.ToString() == label).OrderByDescending(a => a.ComponentCode).FirstOrDefault();
        //    }

        //    if (data == null)
        //    {
        //        data = db.VW_NEW_LABEL_NOCOMPs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.ComponentJoin == null).OrderByDescending(a => a.ComponentCode).FirstOrDefault();
        //    }

        //    //var data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == label).OrderByDescending(a => a.Component).FirstOrDefault();
        //    //var data = db.VW_NEW_LABEL_FORMs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == label).OrderByDescending(a => a.Component).FirstOrDefault();
        //    return data;
        //}

        public VW_NEW_LABEL_FORM Get_SampleDueDateNew_ByID(string labnum)
        {
            var data = db.VW_NEW_LABEL_FORMs.Where(a => a.LabNumber == labnum).OrderByDescending(a => a.Component).FirstOrDefault();
            return data;
        }

        public VW_REVIEW_LABNUMBER Get_Review_ByID(string labnum)
        {

            var data = db.VW_REVIEW_LABNUMBERs.Where(a => a.LabNumber == labnum).OrderByDescending(a => a.Component).FirstOrDefault();
            return data;
        }

        public VW_LAST_OIL_CHANGED Get_UnitHM()
        {
            var data = db.VW_LAST_OIL_CHANGEDs.FirstOrDefault();
            return data;
        }
        
        public string Get_LastLabNumber(string id)
        {
            string data = db.fn_lastLabNumber(id);
            return data;
        }

        public string Get_LastLabNumber(string id, string wo, string dstrct, string compcode, string complbl)
        {
            string data = db.fn_lastLabNumber(id);
            return data;
        }

        public void Create_SampleDueDate(TBL_T_SAMPLE_DUE_DATE tbl)
        {
            TBL_T_SAMPLE_DUE_DATE data1 = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == tbl.LabNumber ).FirstOrDefault();
            TBL_T_SAMPLE_DUE_DATE data2 = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == tbl.LabNumber && a.Component == tbl.Component).FirstOrDefault();

            if (data1 == null && data2 == null) {
                //var compcode = tbl.Component.Substring(0, 4);
                //string[] comlbl = tbl.Component.Split(new char[] { '-' });
                //var complbl = comlbl[1];

                //var cekcomp = db.TBL_R_UNIT_TYPEs.Where(x=> x.Type == compcode).ToList();
                //for (int i = 0; i < cekcomp.Count; i++)
                //{
                //    var compnow = cekcomp[i].Component;
                //    //string[] compnow1 = compnow.Split(new char[] { '-' });
                //    //var compnow2 = compnow1[1];

                

                //    if (compnow == complbl) {
                //TBL_T_SAMPLE_DUE_DATE data1 = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == tbl.LabNumber).FirstOrDefault();
                //if (data1 == null)
                //{

                TBL_T_SAMPLE_DUE_DATE data = new TBL_T_SAMPLE_DUE_DATE();
                        data.LabNumber = tbl.LabNumber;
                        data.NoWO = tbl.NoWO;
                        data.UnitHM = tbl.UnitHM;
                        data.Component = tbl.Component;
                        data.SamplingDate = tbl.SamplingDate;
                        data.OilBrand = tbl.OilBrand;
                        data.OilType = tbl.OilType;
                        data.OilSpec = tbl.OilSpec;
                        data.OilHM = tbl.OilHM;
                        data.NRP = tbl.NRP;
                        data.District = tbl.District;
                        data.PIC = tbl.PIC;
                        data.TypeOilHM = tbl.TypeOilHM;
                        data.OilChanged = tbl.OilChanged;
                        data.CreatedDate = DateTime.UtcNow.ToLocalTime();
                        data.CreatedBy = tbl.CreatedBy;
                        data.Status = "Saved";
                        db.TBL_T_SAMPLE_DUE_DATEs.InsertOnSubmit(data);
                        //}

                    //}
                    //else
                    //{
                        //TBL_T_SAMPLE_DUE_DATE data1 = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == tbl.LabNumber).FirstOrDefault();
                        //if (data1 == null)
                        //{

                        //TBL_T_SAMPLE_DUE_DATE data = new TBL_T_SAMPLE_DUE_DATE();
                        //data.LabNumber = labnumnow;
                        //data.NoWO = tbl.NoWO;
                        //data.UnitHM = tbl.UnitHM;
                        //data.Component = compcode + "-" + compnow;
                        //data.SamplingDate = tbl.SamplingDate;
                        //data.OilBrand = tbl.OilBrand;
                        //data.OilType = tbl.OilType;
                        //data.OilSpec = tbl.OilSpec;
                        //data.OilHM = tbl.OilHM;
                        //data.NRP = tbl.NRP;
                        //data.District = tbl.District;
                        //data.PIC = tbl.PIC;
                        //data.TypeOilHM = tbl.TypeOilHM;
                        //data.OilChanged = tbl.OilChanged;
                        //data.CreatedDate = DateTime.UtcNow.ToLocalTime();
                        //data.CreatedBy = tbl.CreatedBy;
                        //data.Status = "Saved";
                        //db.TBL_T_SAMPLE_DUE_DATEs.InsertOnSubmit(data);
                        //}

                    //}
                    db.SubmitChanges();

                //}
            }
            else if (data1 != null && data2 == null)
            {
                var labnumKe = tbl.LabNumber.Substring(12, 1);
                var labnum = tbl.LabNumber.Substring(0, 12);
                int lastlab = Int32.Parse(labnumKe) + 1;
                var labnumnow = labnum + lastlab;

                TBL_T_SAMPLE_DUE_DATE data = new TBL_T_SAMPLE_DUE_DATE();
                data.LabNumber = labnumnow;
                data.NoWO = tbl.NoWO;
                data.UnitHM = tbl.UnitHM;
                data.Component = tbl.Component;
                data.SamplingDate = tbl.SamplingDate;
                data.OilBrand = tbl.OilBrand;
                data.OilType = tbl.OilType;
                data.OilSpec = tbl.OilSpec;
                data.OilHM = tbl.OilHM;
                data.NRP = tbl.NRP;
                data.District = tbl.District;
                data.PIC = tbl.PIC;
                data.TypeOilHM = tbl.TypeOilHM;
                data.OilChanged = tbl.OilChanged;
                data.CreatedDate = DateTime.UtcNow.ToLocalTime();
                data.CreatedBy = tbl.CreatedBy;
                data.Status = "Saved";
                db.TBL_T_SAMPLE_DUE_DATEs.InsertOnSubmit(data);

                db.SubmitChanges();

            }
            else
            {
                data1.SamplingDate = tbl.SamplingDate;
                data1.OilBrand = tbl.OilBrand;
                data1.OilType = tbl.OilType;
                data1.OilSpec = tbl.OilSpec;
                data1.OilHM = tbl.OilHM;
                data1.UnitHM = tbl.UnitHM;
                data1.NRP = tbl.NRP;
                data1.PIC = tbl.PIC;
                data1.TypeOilHM = tbl.TypeOilHM;
                data1.OilChanged = tbl.OilChanged;
                data1.UpdateBy = tbl.CreatedBy;
                data1.UpdatedDate = DateTime.UtcNow.ToLocalTime();
                data1.Status = "Saved";

                db.SubmitChanges();
            }
            



        }
        
        
        public void Update_status(string labnumber)
        {
            TBL_T_SAMPLE_DUE_DATE data1 = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == labnumber).FirstOrDefault();
            if (data1.Status== "Printed")
            {
                data1.Status = "Delivered";
            }
            if (data1.Status =="Delivered")
            {
                data1.Status = "On Lab";
            }
            else
            {
                data1.Status = "On Lab";
            }
                
            db.SubmitChanges();
        }

        public void UpdateSts_SampleDueDate(string labnumber)
        {
            TBL_T_SAMPLE_DUE_DATE data1 = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == labnumber).FirstOrDefault();
            if (data1.Status == "Printed")
            {
                data1.Status = "Delivered";
            }
            if (data1.Status == "Delivered")
            {
                data1.Status = "On Lab";
            }
            else
            {
                data1.Status = "On Lab";
            }

            db.SubmitChanges();
        }

        public void Print_Sample(string labNumber, string printer)
        {
            TBL_T_SAMPLE_DUE_DATE dataSample = db.TBL_T_SAMPLE_DUE_DATEs.Where(a => a.LabNumber == labNumber).FirstOrDefault();
            dataSample.Status = "Printed";

            TBL_T_JOB_PRINTING dataPrint = new TBL_T_JOB_PRINTING();
            dataPrint.DSTRCT_CODE = dataSample.District;
            dataPrint.PRINTER_NAME = printer;
            //dataPrint.PRINTER_NAME = "KPHOPGITBC01";
            dataPrint.CODE_ID = dataSample.LabNumber;
            dataPrint.JOB_TYPE = 1;
            dataPrint.STATUS = 0;

            dbPrint.TBL_T_JOB_PRINTINGs.InsertOnSubmit(dataPrint);

            dbPrint.SubmitChanges();
            db.SubmitChanges();
        }

        public IEnumerable<TBL_R_DSTRCTCODE> Get_District()
        {
            var data = db.TBL_R_DSTRCTCODEs.ToList();
            return data;
        }

        public IEnumerable<VW_SAMPLE_OPEN> Get_SampleCreate()
        {
            var data = db.VW_SAMPLE_OPENs.OrderByDescending(a => a.WO).ToList();
            return data;
        }

        public IEnumerable<VW_SAMPLE_NOTOPEN> Get_SampleUpdate()
        {
            var data = db.VW_SAMPLE_NOTOPENs.OrderByDescending(a => a.LabNumber).ToList();
            return data;
        }

        public VW_SAMPLE_NOTOPEN Get_SampleUpdate_ByID(string id, string dstrct, string compcode, string complbl)
        {
            var data = db.VW_SAMPLE_NOTOPENs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == complbl).OrderByDescending(a => a.Component).FirstOrDefault();

            if (data == null)
            {
                var comp = compcode + "-" + complbl;
                data = db.VW_SAMPLE_NOTOPENs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == comp).OrderByDescending(a => a.Component).FirstOrDefault();
            }
            return data;
        }

        public IEnumerable<VW_R_UNIT_TYPE> Get_CompCode(string unitmodel)
        {
            var data = db.VW_R_UNIT_TYPEs.Where(x=> x.UnitModel == unitmodel).ToList();
            return data;
        }

        public VW_SAMPLE_NOTOPEN cek_labnumber(string id, string dstrct, string compcode, string complbl)
        {
            var data = db.VW_SAMPLE_NOTOPENs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == complbl).OrderByDescending(a => a.Component).FirstOrDefault();

            if (data == null)
            {
                var comp = compcode + "-" + complbl;
                data = db.VW_SAMPLE_NOTOPENs.Where(a => a.WO == id && a.DSTRCT == dstrct && a.ComponentCode == compcode && a.Component == comp).OrderByDescending(a => a.Component).FirstOrDefault();
            }
            return data;
        }

        public IEnumerable<VW_PRINTER> Get_Printer(string district = "")
        {
            var data = db.VW_PRINTERs.Where(x => x.DSTRCT_CODE == district).ToList();
            return data;
        }

    }
}