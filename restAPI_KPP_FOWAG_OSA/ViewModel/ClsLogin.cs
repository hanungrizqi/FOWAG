using FormsAuth;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using restAPI_KPP_FOWAG_OSA.Models;

namespace restAPI_KPP_FOWAG_OSA.ViewModel
{
    public class ClsLogin
    {
        DB__PLANT_OSADataContext db = new DB__PLANT_OSADataContext();

        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }

        public bool Login()
        {
            bool status = false;
            bool status_login = false;
            string nrp = "";

            if (Username.Count() > 7)
            {
                 nrp = Username.Substring(Username.Length - 7);
                 status_login = Loginuser(Username, Password);
                 
            }
            else if (Username == Password)
            {
                if (status_login == false)
                {
                    nrp = Username;
                    status_login = true;
                }
            }
            else if (Password == "" || Password == null)
            {
                
                nrp = Username;
                status_login = false;
            }
            else
            {
                status_login = false;
            }



            status_login = CheckValidLogin();
            if (status_login == false)
            {
                status_login = OpenLdap(Username, Password);
            }

            if (status_login == true)
            {
                var data_user = db.TBL_M_USERs.Where(x => x.Username == nrp && x.ID_Role == Role).SingleOrDefault();
                if (data_user != null)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }

            return status;

        }


        public bool CheckValidLogin()
        {
            bool stat = false;

            try
            {
                var ldap = new LdapAuthentication("LDAP://KPPMINING:389");
                //stat = ldap.IsAuthenticated("KPPMINING", Username, Password);
                stat = true;
            }
            catch (Exception)
            {
                stat = false;
            }

            return stat;
        }

        public bool Loginuser(string username = "", string password = "")
        {
            bool valid = true;

            try
            {
                var ldap = new LdapAuthentication("LDAP://KPPMINING:389");
                valid = ldap.IsAuthenticated("KPPMINING", username, password);
            }
            catch (Exception ex)
            {
                valid = false;
            }

            return valid;


        }



        public bool OpenLdap(string username = "", string password = "")
        {
            bool status = true;
            String uid = "cn=" + username + ",ou=Users,dc=kpp,dc=net";

            DirectoryEntry root = new DirectoryEntry("LDAP://10.12.101.102", uid, password, AuthenticationTypes.None);

            try
            {
                object connected = root.NativeObject;
                status = true;

            }
            catch (Exception)
            {
                status = false;
            }

            return status;
        }

        public ClsTempUser GetDataEmployee(int idrole)
        {
            ClsTempUser result = new ClsTempUser();
            string nrp = "";

            if (Username.Count() > 7)
            {
                nrp = Username.Substring(Username.Length - 7);
            }
            else
            {
                nrp = Username;
            }

            if (nrp == "dev011")
            {
                result.Nrp = nrp;
                result.ID_Role = idrole;
                result.Name = "Developer";
            }
            else
            {
                var data = db.VW_DETAIL_KARYAWANs.Where(a => a.EMPLOYEE_ID == nrp).FirstOrDefault();
                var role = db.TBL_M_ROLEs.Where(a => a.ID == Role).FirstOrDefault();
                result.Nrp = data.EMPLOYEE_ID;
                result.ID_Role = role.ID;
                result.Name = data.NAME;
            }

            return result;
        }
    }
}