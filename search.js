var data=get('peldaadat.json');// kimentjük a json fájlból az adatokat munkához
var dataDisplay=get('peldaadat.json');// kimentjük a json fájlból az adatokat a megjelítéshez
/* A kereését egy json fáljból olvassuk be ahonnan a szükséges adatokat megejelítjük. */ 
var yes=0;// ne jelenjen meg többször egy találat kell egy bool ami ha 1 lesz akkor nem lép be a többi kereső ciklusba ha már van találat
$(document).ready(function() {
    lowerCaseData(data);// kisbetüsítjük az adatokat a kereséshez 
    var querydata=queryParams();// innen kapjuk meg az urlből a keresendő kifejezést
    var search=querydata.search.toLowerCase();//kisbetüsítjük a keresendő kifejezést is
    var type=querydata.type; // a tipust is kimentjük az urlből hogy hol kerresen
    var count=0;
    if (search!=''){// ha nem adunk meg semmit ne is keressen
    if (type=='ALL'){
        for (var i=0;i<data.length;i++){
            if (data[i].Title.includes(search) || data[i].Author.includes(search) || data[i].Publication.includes(search)){
            $('#table').append('<tr><td>'+dataDisplay[i].Title+'</td><td>'+dataDisplay[i].Author+'</td><td>'+dataDisplay[i].Topic+'</td><td>'+dataDisplay[i].Publication+'</td></tr>');
            count++;
            yes=1;
        }// ha az első kereső mezőbe irtuk bele a kifejezést akkor ahol csak egy érték szerepel összehaonlítja a kifejezést az adatbázisunkal
        if(yes==0){
            for (var j=0;j<data[i].Topic.length;j++){
                if (data[i].Topic[j].includes(search)){
                    $('#table').append('<tr><td>'+dataDisplay[i].Title+'</td><td>'+dataDisplay[i].Author+'</td><td>'+dataDisplay[i].Topic+'</td><td>'+dataDisplay[i].Publication+'</td></tr>');
                    count++;
                    yes=1;
                }
            }
        }// amennyiben több adat van egy cellában azon belül is kell léptetni ezért itt mégegy plusz ciklus kell az összehasonlításhoz
        if (yes==0){
            for (var j=0;j<data[i].Keywords.length;j++){
                if (data[i].Keywords[j]==search){
                    $('#table').append('<tr><td>'+dataDisplay[i].Title+'</td><td>'+dataDisplay[i].Author+'</td><td>'+dataDisplay[i].Topic+'</td><td>'+dataDisplay[i].Publication+'</td></tr>');
                    count++;
                }
            }
        }// hasonlóan az előzöhöz csak a keywordnél pontos egyezés kell hogy kiadja
        yes=0;
    }
    }
    if (type=='TOPIC'){// a topicokon belül keresünk csak
        for (var i=0;i<data.length;i++){
         for (var j=0;j<data[i].Topic.length;j++){
            if (data[i].Topic[j].includes(search)){
                $('#table').append('<tr><td>'+dataDisplay[i].Title+'</td><td>'+dataDisplay[i].Author+'</td><td>'+dataDisplay[i].Topic+'</td><td>'+dataDisplay[i].Publication+'</td></tr>');
                count++;
                }
            }
        }
    }
    if (type=='AUTHOR'){// a szerzőknél keresünk
        for (var i=0;i<data.length;i++){
            if (data[i].Author.includes(search)){
                $('#table').append('<tr><td>'+dataDisplay[i].Title+'</td><td>'+dataDisplay[i].Author+'</td><td>'+dataDisplay[i].Topic+'</td><td>'+dataDisplay[i].Publication+'</td></tr>');
                count++;
        }
    }
    }
    if (type=='TITLE'){// A címekben keresünk
        for (var i=0;i<data.length;i++){
            if (data[i].Title.includes(search)){
                $('#table').append('<tr><td>'+dataDisplay[i].Title+'</td><td>'+dataDisplay[i].Author+'</td><td>'+dataDisplay[i].Topic+'</td><td>'+dataDisplay[i].Publication+'</td></tr>');
                count++;
        }
    }
    }
    }
    if (count==1){// Kiiratni a találatok számát
    $('#results').text(count+' Result');
    }else{
        $('#results').text(count+' Results');
    }

});

function get(theUrl) {// utl lekérés
  
    var jqXHR = $.ajax({
      type: 'GET',
      url: theUrl,
      async: false,
      dataType: 'JSON'
    });
  
    return JSON.parse(jqXHR.responseText);
  
  }

  function queryParams() {// url dekodolás
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

function lowerCaseData(data){//kisbetüsítő függvény
    for (x=0;x<data.length;x++){
        data[x].Title=data[x].Title.toLowerCase();
        data[x].Author=data[x].Author.toLowerCase();
        data[x].Publication=data[x].Publication.toLowerCase();
        for(y=0;y<data[x].Topic.length;y++){
            data[x].Topic[y]=data[x].Topic[y].toLowerCase();
        }
    }
}