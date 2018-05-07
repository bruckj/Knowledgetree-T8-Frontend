
$(document).ready(function() {

    //Ha bármelyik keresést elindítjuk akkor a js kimenti amit a kereső mezőbe írtúnk és a tipus alapján átadja a megefelelő search.js függvénynek
    $('#search1').click(function () {
        var url = 'search.html?search=' + $('#input1').val() + '&&type=ALL';
        window.location.href = url;
    });

    $('#search11').click(function () {
        var tmp = $('#input1').val();
        var searchData = '{"searchType": "keyword", "searchText": "' + tmp + '"}';
        //alert("before");
        console.log("Search text: " + tmp+"\n");
        console.log("SearchType text: keyword\n");
        console.log("Final search data: " + searchData + "\n");
        GetNetworkAjaxDotNet(searchData);
    });

    $('#search2').click(function () {
        var url = 'search.html?search=' + $('#input2').val() + '&&type=TOPIC';
        window.location.href = url;
    });

    $('#search22').click(function () {
        var tmp = $('#input2').val();
        var searchData = '{"searchType": "topic", "searchText": "' + tmp + '"}';
        console.log("Search text: " + tmp + "\n");
        console.log("SearchType text: topic\n");
        console.log("Final search data: " + searchData + "\n");
        GetNetworkAjaxDotNet(searchData);
    });

    $('#search3').click(function () {
        var url = 'search.html?search=' + $('#input3').val() + '&&type=AUTHOR';
        window.location.href = url;
    });

    $('#search33').click(function () {
        var tmp = $('#input3').val();
        var searchData = '{"searchType": "author", "searchText": "' + tmp + '"}';
        console.log("Search text: " + tmp + "\n");
        console.log("SearchType text: author\n");
        console.log("Final search data: " + searchData + "\n");
        GetNetworkAjaxDotNet(searchData);
    });

    $('#search4').click(function () {
        var url = 'search.html?search=' + $('#input4').val() + '&&type=TITLE';
        window.location.href = url;
    });

    $('#search44').click(function () {
        var tmp = $('#input4').val();
        var searchData = '{"searchType": "title", "searchText": "' + tmp + '"}';
        console.log("Search text: " + tmp + "\n");
        console.log("SearchType text: title\n");
        console.log("Final search data: " + searchData + "\n");
        GetNetworkAjaxDotNet(searchData);
    });
});
//A honalp urlcíméből kiemntjük a nekünk szükséges keresési mezőt
function get(theUrl) {
  
    var jqXHR = $.ajax({
      type: 'GET',
      url: theUrl,
      async: false,
      dataType: 'JSON'
    });
  
    return JSON.parse(jqXHR.responseText);
  
  }
// Az urlben elmenteti azt amit a keresési mezőben megadott a felhasználó
  function queryParams() {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.search.substring(1);
  
    urlParams = {};
    while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
  };