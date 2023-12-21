using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.OleDb;
using System.IO;
using KPP_FOWAG_OSA.Models;
using KPP_FOWAG_OSA.ViewModel;

namespace KPP_FOWAG_OSA.Controllers
{
    public class UploadPAPController : Controller
    {
        clsCreatePAP clsCreate = new clsCreatePAP();
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        // GET: UploadPAPNonOsa
        public ActionResult Index()
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("index", "login");
            }
            return View();
        }

        [HttpPost]
        public JsonResult UploadExcel(HttpPostedFileBase list_create, string formatlab)
        {
            int baris;
            bool duplicate = false;
            bool valid = true;
            var dup = "";
            var suk = "";
            int totsukses = 0;
            int totduplikat = 0;


            try
            {
                List<ClsUploadPAP> data_lab = new List<ClsUploadPAP>();

                System.Data.DataSet ds = new System.Data.DataSet();
                if (Request.Files["list_create"].ContentLength > 0)
                {
                    string fileExtension = System.IO.Path.GetExtension(Request.Files["list_create"].FileName);

                    if (fileExtension == ".xls" || fileExtension == ".xlsx" || fileExtension == ".csv")
                    {
                        string fileLocation = Server.MapPath("~/Content/documents");
                        if (System.IO.File.Exists(fileLocation))
                        {
                            System.IO.File.Delete(fileLocation);
                        }

                        string filename = DateTime.UtcNow.ToLocalTime().ToString("yyyy-MM-dd-hh-mm-ss") + Path.GetFileName(list_create.FileName);
                        string pathToExcelFile = Path.Combine(fileLocation, filename);
                        Request.Files["list_create"].SaveAs(Path.Combine(fileLocation, filename));
                        string excelConnectionString = string.Empty;
                        excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
                        fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";

                        //connection String for xls file format.
                        if (fileExtension == ".xls" || fileExtension == ".csv")
                        {
                            excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + Path.Combine(fileLocation, filename) + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                        }
                        //connection String for xlsx file format.
                        else if (fileExtension == ".xlsx")
                        {
                            //excelConnectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);

                            //excelConnectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
                            //excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + Path.Combine(fileLocation, filename) + ";Extended Properties=Excel 12.0;";
                            //excelConnectionString = "Provider = Microsoft.ACE.OLEDB.12.0; Data Source = " + Path.Combine(fileLocation, filename) + "; Extended Properties =\"Excel 12.0;HDR=Yes;IMEX=1\"";
                            excelConnectionString = String.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + Path.Combine(fileLocation, filename) + ";Extended Properties = 'Excel 12.0 Xml;HDR=YES;IMEX=2'; ");

                        }
                        //Create Connection to Excel work book and add oledb namespace
                        OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                        excelConnection.Open();
                        DataTable dt = new DataTable();

                        dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                        if (dt == null)
                        {
                            return null;
                        }

                        String[] excelSheets = new String[dt.Rows.Count];
                        int t = 0;
                        //excel data saves in temp file here.
                        foreach (DataRow row in dt.Rows)
                        {
                            excelSheets[t] = row["TABLE_NAME"].ToString();
                            t++;
                        }
                        OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);

                        string query = string.Format("Select * from [{0}]", excelSheets[0]);
                        using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1))
                        {
                            dataAdapter.Fill(ds);
                        }
                    }



                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        baris = i;
                        if (ds.Tables[0].Rows[i][0].ToString() == null || ds.Tables[0].Rows[i][1].ToString() == "")
                        {
                            break;
                        }
                        else
                        {
                            var num = ds.Tables[0].Rows[i][1].ToString();
                            

                            //if (data == null)
                            //{
                            //duplicate = true;

                            if (formatlab == "1")
                            {
                                var datadup = db.TBL_T_UPLOADPAPs.Where(x => x.LabNumber == ds.Tables[0].Rows[i][1].ToString()).FirstOrDefault();

                                if (datadup == null)
                                {
                                    data_lab.Add(new ClsUploadPAP
                                    {
                                        Lab = "Petrolab",
                                        LabNumber = ds.Tables[0].Rows[i][1].ToString(),
                                        District = ds.Tables[0].Rows[i][4].ToString(),
                                        UnitModel = ds.Tables[0].Rows[i][9].ToString(),
                                        UnitNumber = ds.Tables[0].Rows[i][3].ToString(),
                                        Component = ds.Tables[0].Rows[i][8].ToString(),
                                        UnitHM = ds.Tables[0].Rows[i][19].ToString(),
                                        OilHM = ds.Tables[0].Rows[i][18].ToString(),
                                        OilChanged = ds.Tables[0].Rows[i][20].ToString(),
                                        OilType = ds.Tables[0].Rows[i][12].ToString(),
                                        OilBrand = ds.Tables[0].Rows[i][10].ToString(),
                                        SamplingDate = ds.Tables[0].Rows[i][13].ToString(),
                                        ReceivedDate = ds.Tables[0].Rows[i][14].ToString(),
                                        DateReported = ds.Tables[0].Rows[i][15].ToString(),
                                        Condition = ds.Tables[0].Rows[i][79].ToString(),
                                        Pb = ds.Tables[0].Rows[i][55].ToString(),
                                        Fe = ds.Tables[0].Rows[i][45].ToString(),
                                        Al = ds.Tables[0].Rows[i][49].ToString(),
                                        Cu = ds.Tables[0].Rows[i][47].ToString(),
                                        Cr = ds.Tables[0].Rows[i][51].ToString(),
                                        Sn = ds.Tables[0].Rows[i][53].ToString(),
                                        Ni = ds.Tables[0].Rows[i][43].ToString(),
                                        Si = ds.Tables[0].Rows[i][33].ToString(),
                                        Na = ds.Tables[0].Rows[i][37].ToString(),
                                        Mg = ds.Tables[0].Rows[i][35].ToString(),
                                        Zn = ds.Tables[0].Rows[i][41].ToString(),
                                        Mo = ds.Tables[0].Rows[i][83].ToString(),
                                        Ca = ds.Tables[0].Rows[i][39].ToString(),
                                        P = ds.Tables[0].Rows[i][96].ToString(),
                                        B = ds.Tables[0].Rows[i][85].ToString(),
                                        PQ = ds.Tables[0].Rows[i][93].ToString(),
                                        TBN = ds.Tables[0].Rows[i][29].ToString(),
                                        TAN = ds.Tables[0].Rows[i][27].ToString(),
                                        Soot = ds.Tables[0].Rows[i][61].ToString(),
                                        OXI = "",
                                        Glycol = ds.Tables[0].Rows[i][69].ToString(),
                                        Visc = ds.Tables[0].Rows[i][21].ToString(),
                                        Fuel = ds.Tables[0].Rows[i][57].ToString(),
                                        WaterContent = ds.Tables[0].Rows[i][67].ToString(),
                                        Comment = ds.Tables[0].Rows[i][98].ToString() + " " + ds.Tables[0].Rows[i][99].ToString(),
                                        Created_By = Session["Nrp"].ToString(),
                                        Created_Date = DateTime.UtcNow
                                    });

                                    suk = ds.Tables[0].Rows[i][1].ToString() + ", " + suk;
                                    totsukses = totsukses + 1;
                                }
                                else
                                {
                                    duplicate = true;
                                    dup = ds.Tables[0].Rows[i][1].ToString() + ", " + dup;
                                    totduplikat = totduplikat + 1;
                                }

                                //suk = ds.Tables[0].Rows[i][1].ToString() + ", " + suk;
                                //totsukses = totsukses + 1;
                            }

                            else if(formatlab == "2")
                            {
                                var datadup = db.TBL_T_UPLOADPAPs.Where(x => x.LabNumber == ds.Tables[0].Rows[i][8].ToString()).FirstOrDefault();
                                if (datadup == null)
                                {
                                    data_lab.Add(new ClsUploadPAP
                                    {
                                        Lab = "Technomics",
                                        LabNumber = ds.Tables[0].Rows[i][3].ToString(),
                                        District = "INDE",
                                        UnitModel = ds.Tables[0].Rows[i][1].ToString(),
                                        UnitNumber = ds.Tables[0].Rows[i][0].ToString(),
                                        Component = ds.Tables[0].Rows[i][2].ToString(),
                                        UnitHM = ds.Tables[0].Rows[i][11].ToString(),
                                        OilHM = ds.Tables[0].Rows[i][12].ToString(),
                                        OilChanged = ds.Tables[0].Rows[i][14].ToString(),
                                        OilType = ds.Tables[0].Rows[i][15].ToString(),
                                        OilBrand = ds.Tables[0].Rows[i][15].ToString(),
                                        SamplingDate = ds.Tables[0].Rows[i][7].ToString(),
                                        ReceivedDate = ds.Tables[0].Rows[i][8].ToString(),
                                        DateReported = ds.Tables[0].Rows[i][10].ToString(),
                                        Condition = ds.Tables[0].Rows[i][4].ToString(),
                                        Pb = ds.Tables[0].Rows[i][47].ToString(),
                                        Fe = ds.Tables[0].Rows[i][19].ToString(),
                                        Al = ds.Tables[0].Rows[i][35].ToString(),
                                        Cu = ds.Tables[0].Rows[i][39].ToString(),
                                        Cr = ds.Tables[0].Rows[i][23].ToString(),
                                        Sn = ds.Tables[0].Rows[i][43].ToString(),
                                        Ni = ds.Tables[0].Rows[i][27].ToString(),
                                        Si = ds.Tables[0].Rows[i][71].ToString(),
                                        Na = ds.Tables[0].Rows[i][75].ToString(),
                                        Mg = ds.Tables[0].Rows[i][51].ToString(),
                                        Zn = ds.Tables[0].Rows[i][59].ToString(),
                                        Mo = ds.Tables[0].Rows[i][31].ToString(),
                                        Ca = ds.Tables[0].Rows[i][55].ToString(),
                                        P = ds.Tables[0].Rows[i][63].ToString(),
                                        B = ds.Tables[0].Rows[i][67].ToString(),
                                        PQ = ds.Tables[0].Rows[i][87].ToString(),
                                        TBN = ds.Tables[0].Rows[i][97].ToString(),
                                        TAN = ds.Tables[0].Rows[i][93].ToString(),
                                        Soot = ds.Tables[0].Rows[i][101].ToString(),
                                        OXI = "",
                                        Glycol = ds.Tables[0].Rows[i][117].ToString(),
                                        Visc = ds.Tables[0].Rows[i][5].ToString(),
                                        Fuel = ds.Tables[0].Rows[i][125].ToString(),
                                        WaterContent = ds.Tables[0].Rows[i][121].ToString(),
                                        Comment = ds.Tables[0].Rows[i][91].ToString(),
                                        Created_By = Session["Nrp"].ToString(),
                                        Created_Date = DateTime.UtcNow
                                    });

                                    suk = ds.Tables[0].Rows[i][8].ToString() + ", " + suk;
                                    totsukses = totsukses + 1;
                                }
                                else
                                {
                                    duplicate = true;

                                    dup = ds.Tables[0].Rows[i][8].ToString() + ", " + dup;
                                    totduplikat = totduplikat + 1;
                                }

                                
                            }

                            
                        }


                    }

                    if (duplicate == false)
                    {
                        if (formatlab == "1")
                        {
                            clsCreate.InsertPetroLab(data_lab);
                        }
                        else if (formatlab == "2")
                        {
                            clsCreate.InsertTechnomics(data_lab);
                        }
                    }
                }
                else
                {
                    valid = false;
                }

                return Json(new { Remarks = true, Valid = valid, Duplicate = duplicate, listduplikasi = dup, listsukses = suk, Totalsukses = totsukses, Totalduplikat = totduplikat });
            }
            catch (Exception ex)
            {

                return Json(new { Remarks = false, Message = "Error : " + ex.Message.ToString() });
            }
        }

        
    }
}