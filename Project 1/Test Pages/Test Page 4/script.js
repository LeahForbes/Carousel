var jsonURL = "/vitworks/pen/zNQPNV.js"; //saved JSON file for codePen demo only
// Get live data from darksky.net with your own API key
//https://api.darksky.net/forecast/your_own_api_key/38.9554942,-119.9453795?exclude=minutely,hourly

var ajax = new XMLHttpRequest();
ajax.onload = functionName;
ajax.onerror = errorFunctionName;
ajax.open("GET", jsonURL, true);
ajax.send();

function functionName() {

    if (this.status == 200) { // request succeeded
        var weather = JSON.parse(this.responseText);


        // If Weather Alerts are available
        if (weather.hasOwnProperty("alerts")){
          // Create a carousel for each weather alert

          for (var i = 0; i < weather.alerts.length; i++ ){
            $(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="'+ i +'"></li>');
            $(".carousel-indicators li:first").addClass("active");

            $(".carousel-inner").append('<div class="item"><div class="container"><div class="carousel-caption alert_'+ i +'"></div></div></div>');
            $(".item:first").addClass("active");
            $(".alert_"+ i ).append("<h1>" + weather.alerts[i].title +"</h1>");

            //list all regions affected by this Alert
            $(".alert_"+ i ).append("<h5></h5>");
            var allRegions = []; // This could also be done with strings
              for (var j = 0; j < weather.alerts[i].regions.length; j++){
                allRegions.push(weather.alerts[i].regions[j]); //put all regions into array
              }
            $(".alert_"+ i + " h5" ).text(allRegions.join(", ")); //Put commas between regions

            var alertIntro = shorten(weather.alerts[i].description, 310); // Shorten the alert message
            $(".alert_"+ i ).append("<p>" + alertIntro + "</p>");
            $(".alert_"+ i ).append('<p><a class="btn btn-lg btn-primary" href="'+ weather.alerts[i].uri +'" role="button">More Info</a></p>');

          }; // End Alerts loop.



        } else{
          // There are no Alerts, create on carousel with a message

            $(".carousel-inner").append('<div class="item active"><div class="container"><div class="carousel-caption"></div></div></div>');
            $(".carousel-caption").append("<h1>No Weather Alerts</h1>");
            $(".carousel-caption" ).append("<p>Currently there are no weather alerts in South Lake Tahoe area!</p>");
            $(".carousel-caption" ).append('<p><a class="btn btn-lg btn-primary" href="http://www.weather.com" role="button">Weather Info</a></p>');
        }


    } else {
        // handle more HTTP response codes here;
      console.log(this.statusText);
    }
}
function errorFunctionName(e) {
    $(".carousel-inner").append('<div class="item active"><div class="container"><div class="carousel-caption"></div></div></div>');
    $(".carousel-caption").append("<h1>No Weather Data Found</h1>");
    $(".carousel-caption" ).append("<p>Can't load weather data. Check your internet connection.</p>");
    $(".carousel-caption" ).append('<p><a class="btn btn-lg btn-primary" href="https://fast.com/" role="button">Check your internet connection</a></p>');
}

function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}
