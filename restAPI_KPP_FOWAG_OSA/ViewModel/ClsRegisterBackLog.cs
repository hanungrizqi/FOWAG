using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsRegisterBackLog
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        DB_PLANT_BCSDataContext bcs = new DB_PLANT_BCSDataContext();

        public string LabNumber { get; set; }
        public string NoBacklog { get; set; }
        public string BacklogDesc { get; set; }
        public DateTime InspectonDate { get; set; }
        public string Inspector { get; set; }
        public string WorkGroup { get; set; }
        public string StandarJob { get; set; }
        public string NRPGL { get; set; }
        public string OriginatorID { get; set; }
        public DateTime PlanRepairDate { get; set; }
        public int ManPower { get; set; }
        public float HourEstimation { get; set; }
        public string Status { get; set; }
        public string PartNO { get; set; }
        public string StockCode { get; set; }
        public string Mnemonic { get; set; }
        public string PartClass { get; set; }
        public string PartDesc { get; set; }
        public string FigNo { get; set; }
        public int IndexNo { get; set; }
        public int Qty { get; set; }
        public string Eqp_Number { get; set; }
        public int HM_NUMBER { get; set; }
        public string Component_Id { get; set; }
        public string DSTRCT { get; set; }

        public IEnumerable<VW_WORKGROUP_BACKLOG> GetWorkGroup(string district)
        {
            var data = db.VW_WORKGROUP_BACKLOGs.Where(a => a.dstrct_code == district).ToList();
            return data;
        }
        
        //public VW_REGISTER_BACKLOG GetRegisterBacklog(string labNumber)
        public VW_REGISTER_BACKLOG GetRegisterBacklog(string labNumber)
        {
            var data = db.VW_REGISTER_BACKLOGs.Where(a => a.LabNumber == labNumber).FirstOrDefault();
            return data;
        }
        
        public TBL_T_BACKLOG GetLastNoBacklog(string id)
        {
            var data = db.TBL_T_BACKLOGs.Where(a => a.NoBacklog.Contains(id)).OrderByDescending(a => a.CreatedDate).FirstOrDefault();
            return data;
        }

        public VW_BACKLOG_BC GetNoBacklogBCS(string nobacklog)
        {
            var data = db.VW_BACKLOG_BCs.Where(a => a.NO_BACKLOG == nobacklog).FirstOrDefault();
            return data;
        }


        public TBL_T_RECOMMENDED_PART GetEditPart(string id)
        {
            var data = db.TBL_T_RECOMMENDED_PARTs.Where(a => a.ID == Convert.ToInt32(id)).FirstOrDefault();
            //db.TBL_T_RECOMMENDED_PARTs.DeleteOnSubmit(data);
            //db.SubmitChanges();
            return data;
        }

        public IEnumerable<VW_RECOMMENDED_PART> GetAddPart(string search, string district)
        {
            string caridata = "";
            if (search != null)
            {
                caridata = search;
            }
            var data = db.VW_RECOMMENDED_PARTs.Where(a => (a.PART_DESC.Contains(caridata) | a.part_no == caridata | a.stock_code == caridata) & a.dstrct_code == district).ToList();
            return data;
        }
        
        public IEnumerable<VW_T_RECOMMENDED_PART> GetPart(string noBacklog)
        {
            var data = db.VW_T_RECOMMENDED_PARTs.Where(a => a.NoBackLog == noBacklog).ToList();
            return data;
        }
        
        public IEnumerable<VW_STANDARJOB_BACKLOG> GetStandarJob(string district)
        {
            var data = db.VW_STANDARJOB_BACKLOGs.Where(a => a.DSTRCT_CODE == district).ToList();
            return data;
        }

        public IEnumerable<VW_STANDARJOB_BACKLOG> Get_ReviewStandarJob(string district, string stdjob)
        {
            var data = db.VW_STANDARJOB_BACKLOGs.Where(a => a.DSTRCT_CODE == district && a.STD_JOB_NO == stdjob).ToList();
            return data;
        }

        public void Delete_Part(string id)
        {
            TBL_T_RECOMMENDED_PART data = db.TBL_T_RECOMMENDED_PARTs.Where(a => a.ID == Convert.ToInt32(id)).FirstOrDefault();
            db.TBL_T_RECOMMENDED_PARTs.DeleteOnSubmit(data);
            db.SubmitChanges();
        }

        public void Create_Backlog(ClsRegisterBackLog clsRB)
        {
            saveBackLog(clsRB);

            TBL_T_RECOMMENDED_PART dataPart = new TBL_T_RECOMMENDED_PART();
            dataPart.NoBackLog = clsRB.NoBacklog;
            dataPart.PartNo = clsRB.PartNO;
            dataPart.StockCode = clsRB.StockCode;
            dataPart.PartDesc = clsRB.PartDesc;
            dataPart.FigNo = clsRB.FigNo;
            dataPart.IndexNo = clsRB.IndexNo;
            dataPart.Qty = clsRB.Qty;
            dataPart.distrik = clsRB.DSTRCT;
            dataPart.mnemonic = clsRB.Mnemonic;
            dataPart.@class = clsRB.PartClass;
            db.TBL_T_RECOMMENDED_PARTs.InsertOnSubmit(dataPart);

            db.SubmitChanges();
        }

        public void Update_Part(string NoBacklog = "", string PartNo = "", string FigNo = "", int Qty = 0, int IndexNo = 0)
        //public void Update_Part(ClsRegisterBackLog clsRB)
        {

            TBL_T_RECOMMENDED_PART dataPart = db.TBL_T_RECOMMENDED_PARTs.Where(a => a.NoBackLog == NoBacklog && a.PartNo == PartNo).FirstOrDefault();
            dataPart.FigNo = FigNo;
            dataPart.IndexNo = IndexNo;
            dataPart.Qty = Qty;

            string district = NoBacklog.Substring(10, 4);
            string partnum = district + PartNo;

            //TBL_BACK_PART PartBCS = bcs.TBL_BACK_PARTs.Where(a => a.NO_BACKLOG == NoBacklog && a.PART_NUMBER == partnum).FirstOrDefault();
            //PartBCS.FIG_NUMBER = FigNo;
            //PartBCS.INDX_NUMBER = IndexNo.ToString();
            //PartBCS.QTY_PART = Qty;

            db.SubmitChanges();
        }

        public void Register_BCS(ClsRegisterBackLog clsRB)
        {
            saveBackLog(clsRB);

            var dataLab = db.VW_LABEL_FORMs.OrderByDescending(a => a.LabNumber).FirstOrDefault();
            var compcode = "";
            if (dataLab != null)
            {
                if (dataLab.ComponentCode != "" || dataLab.ComponentCode != null)
                {
                    compcode = dataLab.ComponentCode;
                }
            }

            //TBL_BACKLOG cek = bcs.TBL_BACKLOGs.Where(a => a.NO_BACKLOG == clsRB.NoBacklog).FirstOrDefault();


            TBL_BACKLOG data = new TBL_BACKLOG();
            data.NO_BACKLOG = clsRB.NoBacklog;
            data.WO_NUMBER = "-";
            data.EQP_NUMBER = clsRB.Eqp_Number;
            data.BACKLOG_DESC = clsRB.BacklogDesc;
            data.COMPONENT_ID = compcode;
            data.HM_NUMBER = clsRB.HM_NUMBER;
            data.PLAN_REP_DATE = clsRB.PlanRepairDate;
            data.PLAN_FINISH_DATE = clsRB.PlanRepairDate;
            data.EST_HOUR = Convert.ToDecimal(clsRB.HourEstimation);
            data.BACK_STATUS = "Open";
            data.DISTRICT = clsRB.DSTRCT;
            data.POSISI = "ADM";
            data.BACKLOG_FIRST_ALERT = "NO";
            data.BACKLOG_CREATE_DATE = DateTime.UtcNow.ToLocalTime();
            data.ID_ADM = "-";
            data.GL_NRP = clsRB.NRPGL;
            data.EGI_ID = dataLab.UnitModel;

            var getGLName = db.VW_KARYAWAN_PLANTs.Where(a => a.EMPLOYEE_ID == clsRB.NRPGL).FirstOrDefault();
            data.GL_NAME = getGLName.NAME;

            data.CLOSING_WO = "Open";
            bcs.TBL_BACKLOGs.InsertOnSubmit(data);
            bcs.SubmitChanges();

            TBL_TR1 dataTR1 = new TBL_TR1();
            dataTR1.TR1_USER_ID = "-";
            dataTR1.TR1_DIST_CODE = clsRB.DSTRCT;
            dataTR1.TR1_REP_DATE = clsRB.PlanRepairDate.ToString();
            dataTR1.TR1_UPLOAD_ELLIPSE = "9";
            dataTR1.TR1_DESCRIPTION = clsRB.BacklogDesc;
            dataTR1.TR1_EQUIPNO = clsRB.Eqp_Number;
            dataTR1.TR1_NO_BACKLOG = clsRB.NoBacklog;
            dataTR1.TR1_COMPONENTID = compcode;
            dataTR1.TR1_STANDARD_JOB = clsRB.StandarJob;
            dataTR1.TR1_ORIG = clsRB.OriginatorID;
            dataTR1.TR1_WORK_GROUP = clsRB.WorkGroup;
            dataTR1.TR1_INSERT_TIME = DateTime.UtcNow.ToLocalTime().ToString();
            dataTR1.TR1_EGI_ID = dataLab.UnitModel;
            //dataTR1.TR1_PLAN_FINISH_DATE =
            bcs.TBL_TR1s.InsertOnSubmit(dataTR1);
            bcs.SubmitChanges();


            var backlogOSA = db.VW_T_RECOMMENDED_PARTs.Where(a => a.NoBackLog == clsRB.NoBacklog).ToList();
            if (backlogOSA != null)
            {
                foreach (var item in backlogOSA)
                {
                    var cekPART = db.VW_RECOMMENDED_PARTs.Where(a => a.part_no == item.PartNo && a.dstrct_code == clsRB.DSTRCT).ToList();
                    var cekPARTDetail = db.VW_T_RECOMMENDED_PARTs.Where(a => a.PartNo == item.PartNo && a.NoBackLog == clsRB.NoBacklog).ToList();

                    foreach (var itemPART in cekPART)
                    {
                        string partID = clsRB.DSTRCT + item.PartNo;
                        var part = bcs.TBL_PARTs.Where(a => a.PART_ID == partID).FirstOrDefault();
                        if (part == null)
                        {
                            db.sp_insertPartBacklog_BCS(partID, clsRB.DSTRCT, item.PartNo, itemPART.stock_code, itemPART.PART_DESC, itemPART.mnemonic, itemPART.unit_of_issue, itemPART.@class);
                        }
                    }

                    foreach (var i in cekPARTDetail)
                    {
                        string BackPartID = clsRB.NoBacklog + item.PartNo;
                        string partNum = clsRB.DSTRCT + item.PartNo;


                        string figNo = i.FigNo;
                        db.sp_insertBackPartBacklog_BCS2(BackPartID, partNum, clsRB.NoBacklog, item.Qty, clsRB.InspectonDate, "PPA", item.StockCode, figNo, i.IndexNo.ToString(), i.@class);
                    }
                }

            }
        }

        public void saveBackLog(ClsRegisterBackLog clsRB)
        {
            TBL_T_BACKLOG tBL = db.TBL_T_BACKLOGs.Where(a => a.NoBacklog == clsRB.NoBacklog).FirstOrDefault();

            DateTime craet = DateTime.Now;
            if (tBL == null)
            {
               
                TBL_T_BACKLOG data = new TBL_T_BACKLOG();
                data.LabNumber = clsRB.LabNumber;
                data.NoBacklog = clsRB.NoBacklog;
                data.BacklogDesc = clsRB.BacklogDesc;
                data.InspectonDate = clsRB.InspectonDate;
                data.Inspector = clsRB.Inspector;
                data.WorkGroup = clsRB.WorkGroup;
                data.StandarJob = clsRB.StandarJob;
                data.NRPGL = clsRB.NRPGL;
                data.OriginatorID = clsRB.OriginatorID;
                data.PlanRepairDate = clsRB.PlanRepairDate;
                data.Manpower = clsRB.ManPower;
                data.HourEstimation = clsRB.HourEstimation;
                data.Status = clsRB.Status;
                data.CreatedBy = clsRB.Inspector;
                data.CreatedDate = DateTime.UtcNow.ToLocalTime();
                db.TBL_T_BACKLOGs.InsertOnSubmit(data);
            }
            else
            {
                tBL.BacklogDesc = clsRB.BacklogDesc;
                tBL.InspectonDate = clsRB.InspectonDate;
                tBL.WorkGroup = clsRB.WorkGroup;
                tBL.StandarJob = clsRB.StandarJob;
                tBL.NRPGL = clsRB.NRPGL;
                tBL.OriginatorID = clsRB.OriginatorID;
                tBL.PlanRepairDate = clsRB.PlanRepairDate;
                tBL.Manpower = clsRB.ManPower;
                tBL.HourEstimation = clsRB.HourEstimation;
            }
            db.SubmitChanges();
        }

        public IEnumerable<TBL_R_LAB> Get_Lab()
        {
            var data = db.TBL_R_LABs.ToList();
            return data;
        }

        public IEnumerable<VW_R_COMPCODE> Get_CompCode()
        {
            var data = db.VW_R_COMPCODEs.ToList();
            return data;
        }

        public IEnumerable<VW_R_UNITNUMBER> Get_UnitNumber()
        {
            var data = db.VW_R_UNITNUMBERs.ToList();
            return data;
        }

        public IEnumerable<VW_R_UNITMODEL> Get_UnitModel()
        {
            var data = db.VW_R_UNITMODELs.ToList();
            return data;
        }
    }
}