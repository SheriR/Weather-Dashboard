var apiKey = a333800364e5ae767ad61d63bfb93524;

function currentWeather(city) {

    // Querying the api current weather
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=a333800364e5ae767ad61d63bfb93524";
    
    console.log(queryURL);

 $.ajax({
      url: queryURL,
      method: "GET"

     
    }).then(function(response) {
console.log(response);
// Printing the entire object to console
// Constructing HTML containing the weather information
//var currentWeatherDiv = $("#weathercontainer>");     
var city = response.name;
     
      let date = moment().format("L"); 
      var cityName = $("#cityName").text(city + " (" + date + ")"); 
      //var date = $("#todaysDate").text(moment().format('L'));
      console.log(date,"this is today's date");
      var weatherIcon = $("#weatherIcon").html("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
      //var weatherIcon = response.weather[0].icon;
      //var showIcon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      var tempf = (response.main.temp);
      var cityTemp = $("#cityTemp").text("Temperature: " + tempf + " °F");
      //var description = $("<p>").text(response.weather[0].description);
      var humidity = $("#humidity").text("Humidity: " + response.main.humidity + "%");
      var windSpeed = $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
      
    //var uvIndex = $("<li>").text("UV Index: " + )

// for UVIndex                
      var lon = response.coord.lon;
      var lat = response.coord.lat;     

      //UVIndex(lat,lon); 
 
 
      // Showing previous searches in sidebar.
var searchHistory = $("<button id='historyBtn'>").html(response.name);
$("#searchHistoryList").append(searchHistory);

      
      // Empty the contents of the currentWeather div & append new content
      $('#currentWeather').empty();
      $('#currentweather').append(cityName, weatherIcon, cityTemp, humidity, windSpeed);
     
});
}

function UVIndex(lon, lat) {

//  Querying the api for UV 

let queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    
console.log(queryURLUV, "UVIndex");

$.ajax({
url: queryURLUV,
method: "GET"
}).then(function(results) {

  
})
}




function fiveDayForecast(city) {     
        
// Querying the api for 5 day forecast

let queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=a333800364e5ae767ad61d63bfb93524"; 

$.ajax({
  url: queryURL5,
  method: "GET"

}).then(function(response5Day) {
  console.log(response5Day, 'this');
          
    for(let i = 0; i < response5Day.list.length; i += 8) {
        // var formatDate = response5Day.list[i].dt_txt;
        // var date5Day = $("#day-").moment(formatDate).format("L");          
        // var weatherIcon5 = $("#weatherIcon").attr("<img src='http://openweathermap.org/img/w/" + response5Day.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        // var tempf5Day = response5Day.list[i].main.temp_max;
        // varcityTemp5 = $("#temp").text("Temp: " + tempf5Day + " °F")
        // var humidity5Day = $("humidity").text("Humidity: " + response5Day.list[i].main.humidity + "%");
        
        var date = response5Day.list[i].dt_txt;
        var formatDate = moment(date).format("ddd");
        //var tetempFmp = (response5Day.list[i].main.temp_max - 273.15) * 1.8 + 32;
        var tempf5Day = response5Day.list[i].main.temp_max
       // var  = (temp.toFixed(0) + " °F")
        var humidity = response5Day.list[i].main.humidity;
        var icon = response5Day.list[i].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      // creating the text content to be displayed in each card
      var forecast = $('<li class="Day">').html('<i class="day-icon"><img src="' + weatherIcon + '" height="50" width="50"/></i>'
                    + '<span class="day-name">' + formatDate + '</span><span class="day-temp">' + tempf5Day + '</span></li>');

                // putting all the information needed in each card
                $("#forecastfiveDay").empty()
                $("#forecastfiveDay").append(forecast)


        
        console.log(response5Day.list[i]);


       

        //var newTile = $('div class = "tile is-parent">');
        //var newChild = $('<article class="tile is-child box>');        
        //var city5Day = $("<p>").text("Temp: " + temp5Day + "°F");
        //var humidity= $("<p>").text("Humidity: " + humidity5Day + "%");

           
        //  var forecast = $('<article class="tile is-child box>').html('<div class="content">'
        //     + '<p class=is-size-4 id="date5Day">' + date5Day + '</div>' + '</br>' 
        //     + '<p class=is-size-4 id="icon5Day">' + weatherIcon5 + '</div>' + '</br>'
        //     + '<p class is-size-6 id="city5Day">' + "Temperature: " + temp5Day + "°F" + '</div>' +
        //      '</br>' + '<p class is-size-6 id="cityHumidity5Day">' + "Humidity: " + humidity5Day + "%" + '</div>'
            
        //  );

        //  var futureWeather = $('<div class="card bg-light ml-0 mb-3 mr-3" style="min-width: 150px;">').html('<div class="card-body">'
        //  + '<h6 class="card-title" id="date">' + date5Day + "</h6>" 
        //  + '<img src="' + weatherIcon5 + '"/>' 
        //  + '<div class="card-text" id="temp-humidity">' 
        //  + "Temperature: " + temp5Day + "°F" 
        //  + "<br>" 
        //  + "Humidity: " + humidity5Day + "%" 
        //  + "</div>" + "</div>" + "</div>");


    // Empty the contents of the 5DayForecast div & append new content
//newTile.append(newChild).append(date5day).append(weatherIcon5).append(city5Day).append(humidity);

//$("#forecast").empty();
//$("#forecast").append(date5Day, weatherIcon5, cityTemp5, humidity5Day);

  }
  });
}
    






$(document).ready(function(){
// Event handler for user clicking the citySearchBtn
  $("#citySearchBtn").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    var city = $("#city-input").val().trim();
    currentWeather(city);
    fiveDayForecast(city);
});

});