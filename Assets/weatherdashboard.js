$(document).ready(function() {


// This is our API key.
let APIKEY = "a804ac6a73913ed01ba13891e4b89cc8";


$("#citySearchBtn").click(function() {
    return getCurrentWeather();

});



function getCurrentWeather(){
    var city = $("citySearchText").val();

    if (city != ''){

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKEY}`,
            type: "GET",
            dataType: 'jsonp',
            success: function(data){
                console.log(data)

              

            }

        });

    }else {
        $("error").html('#<div>City field cannot be empty</div>');
    }
}

}); //close $(document).ready(function() {