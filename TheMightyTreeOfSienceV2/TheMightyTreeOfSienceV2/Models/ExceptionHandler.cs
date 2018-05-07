using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheMightyTreeOfSienceV2.Models
{
    public static class ExceptionHandler
    {
        public static Newtonsoft.Json.Linq.JObject GetExceptionInfo(string ownMsg, Exception e, int from)
        {
            Newtonsoft.Json.Linq.JObject info = new Newtonsoft.Json.Linq.JObject();
            if (!e.Message.Contains("error_message"))
            {
                info.Add("error_message", ownMsg);
                info.Add("system_message", e.Message);
                info.Add("usr_info", e.Data.ToString());
                info.Add("inner_exception", (e.InnerException == null) ? "No other exception!" : e.InnerException.ToString());
                info.Add("source", e.Source);
                info.Add("from", from); // 1=DbMgm, 2=GraphCreator, 3=Controller
            } else
            {
                info = new Newtonsoft.Json.Linq.JObject(e.Message);
            }
            return info;
        } 
    }
}