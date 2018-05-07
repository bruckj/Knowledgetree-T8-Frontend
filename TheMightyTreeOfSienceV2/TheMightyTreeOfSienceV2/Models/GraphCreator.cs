using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TheMightyTreeOfSienceV2.Models
{

    public class GraphCreator
    {
        private DBManager dbMan = null;        // handles database connections, read db's

        public GraphCreator()
        {
            dbMan = DBManager.DBManaggerInstance;
        }

        public string GetGraph(string resource)
        {
            // Format: "{\"nodes\":[], \"edges\":[], \"options:{} }"
            // TODO: Exception handling
            // TODO: Measure performance
            JObject rawData = null;
            JObject jsonGraph = null;
            string data = "";

            try
            {
                rawData = dbMan.Read(resource);
                List<JToken> result = rawData["result"].ToList<JToken>(); // ArgumentNullException if its not exists
                jsonGraph = new JObject();
                
                JObject node = null;
                JObject edge = null;
                JArray jEdges = new JArray();
                JArray jNodes = new JArray();
                //TODO: node-ok és élek külön szálon
                //TODO: clusterezés és szeJó.rzőket, kulcsszavakat külön csúcsokba
                foreach (JToken item in result)
                {
                    node = new JObject();
                    if (rawData["is_success"].ToString().Equals("True"))
                    {
                        node.Add("id", item["id"]);
                        node.Add("label", item["title"]);
                        node.Add("url", item["url"]);
                        node.Add("shape", "box");
                        jNodes.Add(node);
                        /* For some reason. there is no such field. Waiting for come back.
                         * foreach (JToken reference in item["references"].ToList<JToken>())
                        {
                            edge = new JObject();
                            edge.Add("to", item["aminer_id"]);
                            edge.Add("from", reference);
                            jEdges.Add(edge);
                        }*/
                    } else // error
                    {
                        // Main error node
                        node.Add("id", 0);
                        node.Add("label", item["failure_message"]);
                        node.Add("shape", "box");
                        node.Add("borderWidth", 5);
                        JObject colour = new JObject();
                        colour.Add("border", "#ED0000");
                        colour.Add("background", "#B30000");
                        node.Add("color", colour);
                        node.Add("chosen", false);
                        node.Add("x", 0);
                        node.Add("y", 0);
                        node.Add("error", true);
                        jNodes.Add(node);

                        /*string[] tmp = new string[] { "Back.", "Try again." };
                        for (int i = 1; i<=2; ++i)
                        {
                            node = new JObject();
                            node.Add("label", tmp[i-1]);
                            node.Add("borderWidth", 5);
                            node.Add("chosen", false);
                            node.Add("color", colour);
                            node.Add("shape", "box");
                            node.Add("id", i);
                            node.Add("x", 0);
                            node.Add("y", 100*i);
                            edge = new JObject();
                            edge.Add("from", 0);
                            edge.Add("to", i);

                            jNodes.Add(node);
                            jEdges.Add(edge);
                        }*/
                    }
                    //node.RemoveAll(); // ha referenciákat ad át, akkor eztönkre teszi az egészet
                }
                                
                jsonGraph.Add("nodes", jNodes);
                jsonGraph.Add("edges", jEdges);
                jsonGraph.Add("options", dbMan.GraphOptions);
                data = jsonGraph.ToString();
            }
            catch (Exception e)
            {
                data = ExceptionHandler.GetExceptionInfo("", e, 2).ToString();
            }
            return data;
        }
    }   
}