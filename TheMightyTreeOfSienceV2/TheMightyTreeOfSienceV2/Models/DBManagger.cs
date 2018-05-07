using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using RestSharp;

namespace TheMightyTreeOfSienceV2.Models
{
    public class DBManager
    {
        private static DBManager instance = null;

        public static DBManager DBManaggerInstance
        {
            get
            {
                if (instance == null)
                    instance = new DBManager();
                
                return instance;
            }
        }

        private JObject graphOptions = null;

        public JObject GraphOptions
        {
            get
            {
               return graphOptions;
            }
        }

        public JObject Read(string resource)
        {
            JObject rawData = null;
            try
            {
                IRestRequest request = new RestRequest(Method.GET);
                request.Resource = resource;
                //TODO: HTTP headers
                IRestClient client = new RestClient(ReadWebBackendAddr());
                IRestResponse response = null;

                response = client.Execute(request);

                rawData = new JObject();
                rawData.Add("status_code", response.StatusCode.ToString());
                rawData.Add("status_description", response.StatusDescription);
                rawData.Add("response_status", response.ResponseStatus.ToString());
                rawData.Add("is_success", response.IsSuccessful);
                rawData.Add("result_encoding", response.ContentEncoding);

                switch (response.StatusCode)
                {
                    case System.Net.HttpStatusCode.OK: //200
                        rawData.Add("result", JArray.Parse(response.Content));
                        break;
                    case System.Net.HttpStatusCode.BadRequest: //400
                    case System.Net.HttpStatusCode.Unauthorized:
                    case System.Net.HttpStatusCode.PaymentRequired:
                    case System.Net.HttpStatusCode.Forbidden:
                    case System.Net.HttpStatusCode.NotFound: //404
                    case System.Net.HttpStatusCode.MethodNotAllowed:
                    case System.Net.HttpStatusCode.NotAcceptable:
                    case System.Net.HttpStatusCode.ProxyAuthenticationRequired:
                    case System.Net.HttpStatusCode.RequestTimeout:
                    case System.Net.HttpStatusCode.Conflict:
                    case System.Net.HttpStatusCode.Gone:
                    case System.Net.HttpStatusCode.LengthRequired:
                    case System.Net.HttpStatusCode.PreconditionFailed:
                    case System.Net.HttpStatusCode.RequestEntityTooLarge:
                    case System.Net.HttpStatusCode.RequestUriTooLong:
                    case System.Net.HttpStatusCode.UnsupportedMediaType:
                    case System.Net.HttpStatusCode.RequestedRangeNotSatisfiable:
                    case System.Net.HttpStatusCode.ExpectationFailed:
                    case System.Net.HttpStatusCode.UpgradeRequired:
                    case System.Net.HttpStatusCode.InternalServerError:
                    case System.Net.HttpStatusCode.NotImplemented:
                    case System.Net.HttpStatusCode.BadGateway:
                    case System.Net.HttpStatusCode.ServiceUnavailable:
                    case System.Net.HttpStatusCode.GatewayTimeout:
                    case System.Net.HttpStatusCode.HttpVersionNotSupported:
                        rawData.Add("result", JArray.Parse("[{'failure_message': 'We could not reach the server or there is no such data! Please, try again later!'}]"));
                        rawData["is_success"] = false;
                        break;
                    default:
                        // Resource problem
                        rawData.Add("result", JArray.Parse("[{'failure_message': 'There are no data to show because of unknown reason! Please, try again later!'}]"));
                        rawData["is_success"] = false;
                        break;
                }
            }
            catch (ArgumentNullException ane)
            {
                throw new ArgumentNullException(ExceptionHandler.GetExceptionInfo("Server could not reach the database due to resource URI is incomprehensible! Please try again later!", ane, 1).ToString());
            }
            catch (UriFormatException ufe)
            {
                throw new UriFormatException(ExceptionHandler.GetExceptionInfo("Server could not reach the database due to URL is wrong! Please try again later!", ufe, 1).ToString());
            }
            catch (Exception e)
            {
                throw new Exception(ExceptionHandler.GetExceptionInfo("Server could not reach the database due to an unknown error! Please try again later!", e, 1).ToString());
            }
            return rawData;
        }

        private JObject ReadGraphOptions()
        {
            //TODO: Create a non-path specific file path for reading
            return ReadJsonFile("TODO: gráf konfig fájl elérési útvonala");
        }

        private string ReadWebBackendAddr()
        {
            JObject webBackInfo = ReadJsonFile("TODO: elérési útvonala a backend json fájlnak");
            return (webBackInfo["address"].ToString() + webBackInfo["action"].ToString());
        }

        // Only for testing
        private JObject ReadJsonFile(string filePath)
        {
            JObject jsonFile = JObject.Parse(File.ReadAllText(filePath));
            JObject data = null;
            // read JSON directly from a file
            using (StreamReader file = File.OpenText(filePath))
            using (JsonTextReader reader = new JsonTextReader(file))
            {
                JObject jsonData = (JObject)JToken.ReadFrom(reader);
                data = jsonData;
            }
            return data;
        }

        private DBManager()
        {
            //...
            graphOptions = ReadGraphOptions();
        }
    }
}