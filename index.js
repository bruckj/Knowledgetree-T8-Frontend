
$(document).ready(function() {

//Ha bármelyik keresést elindítjuk akkor a js kimenti amit a kereső mezőbe írtúnk és a tipus alapján átadja a megefelelő search.js függvénynek
    $('#search1').click(function(){
        var url = 'search.html?search='+$('#input1').val()+'&&type=ALL';
        window.location.href = url;
    })
    $('#search2').click(function(){
        var url = 'search.html?search='+$('#input2').val()+'&&type=TOPIC';
        window.location.href = url;
    })
    $('#search3').click(function(){
        var url = 'search.html?search='+$('#input3').val()+'&&type=AUTHOR';
        window.location.href = url;
    })
    $('#search4').click(function(){
        var url = 'search.html?search='+$('#input4').val()+'&&type=TITLE';
        window.location.href = url;
    })

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
// Az urlben elmenteti azt amit a keresési mezőben megadotta  felhasználó
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