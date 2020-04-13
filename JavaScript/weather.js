const apiKey = "a333800364e5ae767ad61d63bfb93524";

function currentWeather(city) {
  // Querying the api current weather
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=a333800364e5ae767ad61d63bfb93524";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // Printing the entire object to console
    // Constructing HTML containing the weather information
    //var currentWeatherDiv = $("#weathercontainer>");
    var city = response.name;

    let date = moment().format("L");
    var cityName = $("#cityName").text(city + " (" + date + ")");
    console.log(date, "this is today's date");
    var weatherIcon = $("#weatherIcon").html(
      "<img src='http://openweathermap.org/img/w/" +
        response.weather[0].icon +
        ".png' alt='Icon depicting current weather.'>"
    );
    var tempf = response.main.temp;
    var cityTemp = $("#cityTemp").text("Temperature: " + tempf + " °F");
    var humidity = $("#humidity").text(
      "Humidity: " + response.main.humidity + "%"
    );
    var windSpeed = $("#windSpeed").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );

    // for UVIndex
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    // calling the UV function
    uvIndex(lat, lon);

    // Search History Buttons
    var searchHistory = $("<button id='historyBtn'>").html(response.name);
    $("#searchHistoryList").append(searchHistory);

    // Event handler for clicking the history buttons
    $(document).on("click", "#historyBtn", function () {
      console.log("historyBtn clicked");
      let newCity = searchHistory;
      console.log(newCity, "this is history btn city");
      currentWeather(newCity);
      fiveDayForecast(newCity);
    });
  });
}

// UV call based on the long & lat of the city searched
function uvIndex(lat, lon) {
  var queryURLUV =
    "http://api.openweathermap.org/data/2.5/uvi?appid=" +
    apiKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon;

  console.log(queryURLUV, "UV call");

  $.ajax({
    url: queryURLUV,
    method: "GET",
  }).done(function (responseUV) {
    console.log(responseUV, "this is the responseUV");

    var uvNumber = responseUV.value;
    var uv = $("#uv").html(
      "UV Index: " + "<span class='uvBackground'>" + uvNumber + "</span>"
    );

    // creating background colors based on the UV index
    if (uvNumber < 5) {
      $(".uvBackground").css({
        "background-color": "darkgreen",
        color: "white",
        padding: "5px",
      });
    } else if (uvNumber >= 5 && uvNumber <= 7) {
      $(".uvBackground").css({
        "background-color": "yellow",
        padding: "5px",
      });
    } else {
      $(".uvBackground").css({
        "background-color": "red",
        padding: "5px",
      });
    }
  });
}

function fiveDayForecast(city) {
  // Querying the api for 5 day forecast
  let outerDiv = document.getElementById("outerDiv");
  outerDiv.style.display = "initial";
  let queryURL5 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=a333800364e5ae767ad61d63bfb93524";

  $.ajax({
    url: queryURL5,
    method: "GET",
  }).then(function (response5Day) {
    console.log(response5Day, "5 day ajax call");
    let dayCount = 0;
    for (let i = 0; i < response5Day.list.length; i += 8) {
      dayCount++;
      var date = response5Day.list[i].dt_txt.slice(0, 10);
      var date5Day = $(`#date${dayCount}`).text(date);

      var icon5Day =
        "http://openweathermap.org/img/w/" +
        response5Day.list[i].weather[0].icon +
        "@2x.png";

      $(`#icon${dayCount}`).attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response5Day.list[i].weather[0].icon +
          ".png"
      );

      var tempf5Day = response5Day.list[i].main.temp_max;
      var cityTemp5 = $(`#temp${dayCount}`).text("Temp: " + tempf5Day + " °F");
      var humidity5 = response5Day.list[i].main.humidity;
      var humidity5Day = $(`#humidity${dayCount}`).text(
        "Humidity: " + humidity5 + "%"
      );
      console.log(icon5Day, "5dayweathericon");
    }
  });
}

$(document).ready(function () {
  // Event handler for user clicking the citySearchBtn
  $("#citySearchBtn").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    var city = $("#city-input").val().trim();
    $("#city-input").on("click", "city", function () {
      $(this).remove();
    });
    currentWeather(city);
    fiveDayForecast(city);
  });
});
