
function GetNetworkAjaxDotNet(searchData) {
    var parsedSearchData = JSON.parse(searchData);
    $.ajax({
        url: 'GetNetworkData/' + parsedSearchData['searchType'] + '/' + parsedSearchData['searchText'],
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var parsedData = JSON.parse(data); // json is assumed valid, no need for checking
            var graphData = null;
            if (!"error" in parsedData) {
                graphData = {
                    nodes: parsedData["nodes"],
                    edges: parsedData["edges"]
                };
            } else {
                var errNodes = parsedData["nodes"];
                var backNode = {
                    id: 1,
                    label: "Back",
                    borderWidth: 5,
                    shape: "box",
                    x: 0,
                    y: 100,
                    color: {
                        border: "#ED0000", background: "B30000"}
                };
                errNodes[1] = backNode;
                var errEdges = [{from:0, to: 1}];
                graphData = {
                    nodes: errNodes,
                    edges: errEdges
                };
            }
            
            localStorage.setItem("graph", JSON.stringify(graphData));
            localStorage.setItem("graphOpt", JSON.stringify(parsedData["options"]));
            window.location.replace("/Home/Network");
        }//,
        //error: function (xhr, ajaxOptions, thrownError) { alert("Hiba! "+xhr.responseText+ " "+thrownError); },
    });
}

function ReadGraphDataFromStorage() {
    var graphData = JSON.parse(localStorage.getItem("graph"));
    if ("error" in graphData["nodes"][0]) {
        graphData["nodes"][1]["chosen"] = {
            edge: false, label: function (values, id, selected, hovering) {
                window.history.back();
            }
        };
    }
    var graphOptions = JSON.parse(localStorage.getItem("graphOpt"));
    var container = document.getElementById("network");
    var network = new vis.Network(container, graphData, graphOptions);
    return network;
}

function ShowNodeUrl(node) {

} 

function TestGraph() {
    alert("test");
    var nodes = new vis.DataSet([
    { id: 1, label: 'html color', color: 'lime' },
    { id: 2, label: 'rgb color', color: 'rgb(255,168,7)' },
    { id: 3, label: 'hex color', color: '#7BE141' },
    { id: 4, label: 'próba node', color: 'rgba(97,195,238,0.8)' },
    { id: 5, label: 'colorObject', color: { background: 'pink', border: 'purple' } },
    { id: 6, label: 'colorObject + highlight', color: { background: '#F03967', border: '#713E7F', highlight: { background: 'red', border: 'black' } } },
    { id: 7, label: 'colorObject + highlight + hover', color: { background: 'cyan', border: 'blue', highlight: { background: 'red', border: 'blue' }, hover: { background: 'white', border: 'red' } } }
    ])

    // create an array with edges
    var edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
      { from: 4, to: 7 },
      { from: 4, to: 6 },
      { from: 4, to: 6 },
      { from: 4, to: 6 },
      { from: 4, to: 6 },
    ]);
    // create a network
    var container = document.getElementById('network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: { borderWidth: 2 },
        interaction: { hover: true }
    }
    var network = new vis.Network(container, data, options);
}