$("#location").on("keypress", function(e) {
    if (e.which === 13) { //13 key is for 'Enter' 
        const location = this.value;
        //Passing the location name to get the data
        getWeatherInfo(location)
            .then(() => {
                console.log("Weather report generated");
            })
            .catch(err => {
                alert("Please enter a valid city/place");
                console.log(err); //Getting the exact error message in console
            })
    }
});
async function getWeatherInfo(location) {
    const apiKey = "e29bc72dd0b61ac2e85f3e456a07bcfe";

    //Using fetch API for getting the weather of a location
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`);
    console.log("Getting response using fetch");
    const data = await response.json(); //Getting the json data

    if (response.status === 200) { //validating the response 

        console.log("Success");
        const city = data.name;
        const temperature = data.main.temp + "&#176" + "C";
        const weatherType = data.weather[0].main;
        const weatherInfo = data.weather[0].description;
        const minTemp = data.main.temp_min + "&#176" + "C";
        const maxTemp = data.main.temp_max + "&#176" + "C";
        //Days and Months Arrays
        const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
        //Date
        const dateObject = new Date();
        const month = dateObject.getUTCMonth();
        const day = dateObject.getUTCDay();
        const year = dateObject.getUTCFullYear();
        const date = dateObject.getUTCDate();
        //Date to show in browser
        const newdate = daysArray[day] + " " + date + " " + monthsArray[month] + " " + year;

        $("#city span").text(city);
        $("#timeZone span").text(newdate);
        $("#temperature span").html(temperature);
        $("#weatherType span").text(weatherType);
        $("#weatherInfo span").text(weatherInfo);
        $("#minTemp").html(minTemp);
        $("#maxTemp").html("/" + maxTemp);

        $("#location").val("");

    } else {
        throw `${data.message}`; //thowing error message when city is invaliad or any other exception
    }

}
getWeatherInfo("Delhi"); //Setting default city to Delhi -default load