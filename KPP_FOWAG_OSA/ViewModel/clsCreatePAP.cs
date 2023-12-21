using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KPP_FOWAG_OSA.Models;
using KPP_FOWAG_OSA.ViewModel;

namespace KPP_FOWAG_OSA.ViewModel
{
    public class clsCreatePAP
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();
        public void InsertPetroLab(List<ClsUploadPAP> param)
        {
            List<TBL_T_UPLOADPAP> data = new List<TBL_T_UPLOADPAP>();

            var username = "";
            var code = "";
            var temp = "";
            int totalinv = 0;

            foreach (var item in param)
            {

                double con_TBN = 0;
                double con_Pb = 0;
                double con_Fe = 0;
                double con_Al = 0;
                double con_Cu = 0;
                double con_Cr = 0;
                double con_Sn = 0;
                double con_Ni = 0;
                double con_Si = 0;
                double con_Na = 0;
                double con_Mg = 0;
                double con_Zn = 0;
                double con_Mo = 0;
                double con_Ca = 0;
                double con_P = 0;
                double con_B = 0;
                double con_PQ = 0;
                double con_TAN = 0;
                double con_Soot = 0;
                double con_OXl = 0;
                double con_Glycol = 0;
                double con_Visc = 0;
                double con_Fuel = 0;
                double con_Water = 0;

                if (item.TBN != "" )
                {
                    con_TBN = double.Parse(item.TBN);
                }
                if (item.Pb != "" )
                {
                    con_Pb = double.Parse(item.Pb);
                }
                if (item.Fe != "" )
                {
                    con_Fe = double.Parse(item.Fe);
                }
                if (item.Al != "" )
                {
                    con_Al = double.Parse(item.Al);
                }
                if (item.Cu != "" )
                {
                    con_Cu = double.Parse(item.Cu);
                }
                if (item.Cr != "" )
                {
                    con_Cr = double.Parse(item.Cr);
                }
                if (item.Sn != "" )
                {
                    con_Sn = double.Parse(item.Sn);
                }
                if (item.Ni != "" )
                {
                    con_Ni = double.Parse(item.Ni);
                }
                if (item.Si != "" )
                {
                    con_Si = double.Parse(item.Si);
                }
                if (item.Na != "" )
                {
                    con_Na = double.Parse(item.Na);
                }
                if (item.Mg != "" )
                {
                    con_Mg = double.Parse(item.Mg);
                }
                if (item.Zn != "" )
                {
                    con_Zn = double.Parse(item.Zn);
                }
                if (item.Mo != "" )
                {
                    con_Mo = double.Parse(item.Mo);
                }
                if (item.Ca != "" )
                {
                    con_Ca = double.Parse(item.Ca);
                }
                if (item.P != "" )
                {
                    con_P = double.Parse(item.P);
                }
                if (item.B != "" )
                {
                    con_B = double.Parse(item.B);
                }
                if (item.PQ != "" )
                {
                    con_PQ = double.Parse(item.PQ);
                }
                if (item.TAN != "" )
                {
                    con_TAN = double.Parse(item.TAN);
                }
                if (item.Soot != "" )
                {
                    con_Soot = double.Parse(item.Soot);
                }
                if (item.OXI != "" )
                {
                    con_OXl = double.Parse(item.OXI);
                }
                if (item.Glycol != "" )
                {
                    con_Glycol = double.Parse(item.Glycol);
                }
                if (item.Visc != "" )
                {
                    con_Visc = double.Parse(item.Visc);
                }
                if (item.Fuel != "" )
                {
                    con_Fuel = double.Parse(item.Fuel);
                }
                if (item.WaterContent != "")
                {
                    con_Water = double.Parse(item.WaterContent);
                }


                data.Add(new TBL_T_UPLOADPAP
                {
                    Lab = item.Lab,
                    LabNumber = item.LabNumber,
                    District = item.District,
                    UnitModel = item.UnitModel,
                    UnitNumber = item.UnitNumber,
                    Component = item.Component,
                    UnitHM = item.UnitHM,
                    OilHM = item.OilHM,
                    OilChanged = item.OilChanged,
                    OilBrand = item.OilBrand,
                    OilType = item.OilType,
                    SamplingDate = DateTime.Parse(item.SamplingDate),
                    ReceivedDate = DateTime.Parse(item.ReceivedDate),
                    DateReported = DateTime.Parse(item.DateReported),
                    Condition = item.Condition,
                    Pb = con_Pb,
                    Fe = con_Fe,
                    Al = con_Al,
                    Cu = con_Cu,
                    Cr = con_Cr,
                    Sn = con_Sn,
                    Ni = con_Ni,
                    Si = con_Si,
                    Na = con_Na,
                    Mg = con_Mg,
                    Zn = con_Zn,
                    Mo = con_Mo,
                    Ca = con_Ca,
                    P = con_P,
                    B = con_B,
                    PQ = con_PQ,
                    TBN = con_TBN,
                    TAN = con_TAN,
                    Soot = con_Soot,
                    OXl = 0,
                    Glycol = con_Glycol,
                    Visc = con_Visc,
                    Fuel = con_Fuel,
                    WaterContent = con_Water,
                    Comment = item.Comment,

                    Created_By = item.Created_By,
                    Created_Date = item.Created_Date,
                });
                totalinv = totalinv + 1;
            }

            db.TBL_T_UPLOADPAPs.InsertAllOnSubmit(data);
            db.SubmitChanges();
            //db.cusp_NotifikasiKonfirmasiInvoiceExcel(temp, username, code, totalinv.ToString());

        }

        public void InsertTechnomics(List<ClsUploadPAP> param)
        {
            List<TBL_T_UPLOADPAP> data = new List<TBL_T_UPLOADPAP>();

            var username = "";
            var code = "";
            var temp = "";
            int totalinv = 0;

            foreach (var item in param)
            {

                double con_TBN = 0;
                double con_Pb = 0;
                double con_Fe = 0;
                double con_Al = 0;
                double con_Cu = 0;
                double con_Cr = 0;
                double con_Sn = 0;
                double con_Ni = 0;
                double con_Si = 0;
                double con_Na = 0;
                double con_Mg = 0;
                double con_Zn = 0;
                double con_Mo = 0;
                double con_Ca = 0;
                double con_P = 0;
                double con_B = 0;
                double con_PQ = 0;
                double con_TAN = 0;
                double con_Soot = 0;
                double con_OXl = 0;
                double con_Glycol = 0;
                double con_Visc = 0;
                double con_Fuel = 0;
                double con_Water = 0;


                if (item.TBN != "" )
                {
                    con_TBN = double.Parse(item.TBN);
                }
                
                if (item.Pb != "" )
                {
                    con_Pb = double.Parse(item.Pb);
                }
                if (item.Fe != "" )
                {
                    con_Fe = double.Parse(item.Fe);
                }
                if (item.Al != "" )
                {
                    con_Al = double.Parse(item.Al);
                }
                if (item.Cu != "" )
                {
                    con_Cu = double.Parse(item.Cu);
                }
                if (item.Cr != "" )
                {
                    con_Cr = double.Parse(item.Cr);
                }
                if (item.Sn != "" )
                {
                    con_Sn = double.Parse(item.Sn);
                }
                if (item.Ni != "" )
                {
                    con_Ni = double.Parse(item.Ni);
                }
                if (item.Si != "" )
                {
                    con_Si = double.Parse(item.Si);
                }
                if (item.Na != "" )
                {
                    con_Na = double.Parse(item.Na);
                }
                if (item.Mg != "" )
                {
                    con_Mg = double.Parse(item.Mg);
                }
                if (item.Zn != "" )
                {
                    con_Zn = double.Parse(item.Zn);
                }
                if (item.Mo != "" )
                {
                    con_Mo = double.Parse(item.Mo);
                }
                if (item.Ca != "" )
                {
                    con_Ca = double.Parse(item.Ca);
                }
                if (item.P != "" )
                {
                    con_P = double.Parse(item.P);
                }
                if (item.B != "" )
                {
                    con_B = double.Parse(item.B);
                }
                if (item.PQ != "" )
                {
                    con_PQ = double.Parse(item.PQ);
                }
                if (item.TAN != "" )
                {
                    con_TAN = double.Parse(item.TAN);
                }
                if (item.Soot != "" )
                {
                    con_Soot = double.Parse(item.Soot);
                }
                if (item.OXI != "" )
                {
                    con_OXl = double.Parse(item.OXI);
                }
                if (item.Glycol != "" )
                {
                    con_Glycol = double.Parse(item.Glycol);
                }
                if (item.Visc != "" )
                {
                    con_Visc = double.Parse(item.Visc);
                }
                if (item.Fuel != "" )
                {
                    con_Fuel = double.Parse(item.Fuel);
                }
                if (item.WaterContent != "" )
                {
                    con_Water = double.Parse(item.WaterContent);
                }

                //DateTime samdate = DateTime.ParseExact(item.SamplingDate, "dd/MM/yyyy", null);
                var sampdate = item.SamplingDate.ToString();
                List<string> samp = sampdate.Split('/').ToList();
                string sdate = samp[1] + "-" + samp[0] + "-" + samp[2];
                DateTime SamplingDate = DateTime.Parse(sdate);
                //var sample = Sampling_Date.ToString("yyyy-MM-dd");
                //DateTime sampled = DateTime.Parse(sample);


                var recdate = item.ReceivedDate.ToString();
                DateTime ReceivedDate = Convert.ToDateTime(recdate, System.Globalization.CultureInfo.GetCultureInfo("ur-PK").DateTimeFormat);

                var repdate = item.DateReported.ToString();
                DateTime ReportDate = Convert.ToDateTime(repdate, System.Globalization.CultureInfo.GetCultureInfo("ur-PK").DateTimeFormat);

                //string s = item.ReceivedDate.Substring(0, 2) + "-" + item.ReceivedDate.Substring(3, 2) + "-" + item.ReceivedDate.Substring(6, 4);
                //DateTime Received_Date = DateTime.Parse(s);
                //var rec = Received_Date.ToString("yyyy-MM-dd");
                //DateTime received = DateTime.Parse(rec);

                //var repdate = item.DateReported;
                //DateTime Reported_Date = DateTime.Parse(repdate);


                data.Add(new TBL_T_UPLOADPAP
                {
                    Lab = item.Lab,
                    LabNumber = item.LabNumber,
                    District = item.District,
                    UnitModel = item.UnitModel,
                    UnitNumber = item.UnitNumber,
                    Component = item.Component,
                    UnitHM = item.UnitHM,
                    OilHM = item.OilHM,
                    OilChanged = item.OilChanged,
                    OilBrand = item.OilBrand,
                    OilType = item.OilType,
                    SamplingDate = SamplingDate,
                    ReceivedDate = ReceivedDate,
                    DateReported = ReportDate,
                    Condition = item.Condition,
                    Pb = con_Pb,
                    Fe = con_Fe,
                    Al = con_Al,
                    Cu = con_Cu,
                    Cr = con_Cr,
                    Sn = con_Sn,
                    Ni = con_Ni,
                    Si = con_Si,
                    Na = con_Na,
                    Mg = con_Mg,
                    Zn = con_Zn,
                    Mo = con_Mo,
                    Ca = con_Ca,
                    P = con_P,
                    B = con_B,
                    PQ = con_PQ,
                    TBN = con_TBN,
                    TAN = con_TAN,
                    Soot = con_Soot,
                    OXl = 0,
                    Glycol = con_Glycol,
                    Visc = con_Visc,
                    Fuel = con_Fuel,
                    WaterContent = con_Water,
                    Comment = item.Comment,

                    Created_By = item.Created_By,
                    Created_Date = item.Created_Date,
                });
                totalinv = totalinv + 1;
            }

            db.TBL_T_UPLOADPAPs.InsertAllOnSubmit(data);
            db.SubmitChanges();
        }

    }
}
