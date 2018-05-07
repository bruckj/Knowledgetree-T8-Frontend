using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using TheMightyTreeOfSienceV2.Models;

namespace TheMightyTreeOfSienceV2.Controllers
{
    public class HomeController : Controller
    {
        private GraphCreator networker = null;

        public HomeController()
        {
            networker = new GraphCreator();
        }

        [AllowAnonymous]
        [Route("Default")]
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Network()
        {
            return View();
        }

        [AllowAnonymous]
        [Route("DrawGraph")]
        public JsonResult GetNetworkData(string searchType, string searchText)
        {
            //string resource = "keyword/security"; // for testing
            string resource = searchType + '/' + searchText;
            JsonResult data = null;
            try
            {
                // init json response
                data = new JsonResult();
                data.ContentEncoding = Encoding.UTF8;
                data.ContentType = "application/json; charset=utf-8";
                data.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

                // read json data
                data.Data = networker.GetGraph(resource);
            }
            catch (Exception e)
            {
                data.Data = ExceptionHandler.GetExceptionInfo("We are so sorry! Something went wrongin our side! Please, try again later!", e, 3);
                return data;
            }
            return data;
        }
    }
}
