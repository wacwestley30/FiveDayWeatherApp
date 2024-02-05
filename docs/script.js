$(function() {

    let city;
    let cityHistoryArray = [];
    var APIKey = '7b10ccf01a270c6fd2ca6ee3d746b513';
    dayjs().format();
    dayjs.extend(window.dayjs_plugin_utc);
    
    // Global JQuery Variables
    var cityOne = $('#cityOne'),
        cityTwo = $('#cityTwo'),
        citySix = $('#citySix'),
        cityFour = $('#cityFour'),
        cityFive = $('#cityFive'),
        cityThree = $('#cityThree'),
        citySeven = $('#citySeven'),
        cityEight = $('#cityEight'),
        cityInput = $('#cityInput'),
        searchForm = $('#searchForm'),
        currentCity = $('#currentCity'),
        currentCityTemp = $('#currentCityTemp'),
        currentCityWind = $('#currentCityWind'),
        fiveDayOne = $('#fiveDayOne'),
        fiveDayTwo = $('#fiveDayTwo'),
        fiveDayThree = $('#fiveDayThree'),
        fiveDayFour = $('#fiveDayFour'),
        fiveDayFive = $('#fiveDayFive'),
        fiveDayIconOne = $('#fiveDayIconOne'),
        fiveDayIconTwo = $('#fiveDayIconTwo'),
        fiveDayIconThree = $('#fiveDayIconThree'),
        fiveDayIconFour = $('#fiveDayIconFour'),
        fiveDayIconFive = $('#fiveDayIconFive'),
        fiveDayTempOne = $('#fiveDayTempOne'),
        fiveDayTempTwo = $('#fiveDayTempTwo'),
        fiveDayTempThree = $('#fiveDayTempThree'),
        fiveDayTempFour = $('#fiveDayTempFour'),
        fiveDayTempFive = $('#fiveDayTempFive'),
        fiveDayWindOne = $('#fiveDayWindOne'),
        fiveDayWindTwo = $('#fiveDayWindTwo'),
        fiveDayWindThree = $('#fiveDayWindThree'),
        fiveDayWindFour = $('#fiveDayWindFour'),
        fiveDayWindFive = $('#fiveDayWindFive'),
        clearCityHistoryBtn = $('#clearCityHistory'),
        fiveDayHumidityOne = $('#fiveDayHumidityOne'),
        fiveDayHumidityTwo = $('#fiveDayHumidityTwo'),
        fiveDayHumidityThree = $('#fiveDayHumidityThree'),
        fiveDayHumidityFour = $('#fiveDayHumidityFour'),
        fiveDayHumidityFive = $('#fiveDayHumidityFive'),
        currentCityHumidity = $('#currentCityHumidity');

    // TESTING
    // console.log(cityHistoryArray)

    function searchSubmitHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        city = cityInput.val();
        if (!city) {
            alert('Please enter a city');
        // } else if (cityHistoryArray == [] && localStorage.getItem('cityHistory') != null){
        //     let currentHistory = localStorage.getItem('cityHistory');
        //     cityHistoryArray = [currentHistory];
            
        }else if (cityHistoryArray.length >= 8) {
            cityHistoryArray.shift();
        } else if (city) {
            cityInput.val('');
            getCurrentWeather(city);
            getFiveDayForecast(city);
            cityHistoryArray.push(city);
            localStorage.setItem('cityHistory', JSON.stringify(cityHistoryArray));
        }
    };

    function clearHistory() {
        cityHistoryArray = [];
        localStorage.clear();
    };

    function getCurrentWeather(city) {
        var requestCurrentUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&units=imperial&limit=1&appid=' + APIKey;

        fetch(requestCurrentUrl)
            .then(function (response) {
                if(response.ok) {
                    // console.log(response);
                    response.json().then(function(data) {
                        // console.log(data)
                        displayCurrentWeather(data, city)
                    })
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to Open Weather Map API');
            })
    }

    function displayCurrentWeather(data, city) {
        if (data.length === 0) {
            currentCity.text('City not Found');
            return;
        }

        var currentTemperature = Math.round(data.main.temp);
        var roundedWindSpeed = data.wind.speed.toFixed(1);

        currentCity.text(data.name + ', ' + data.sys.country);
        currentCityTemp.text(currentTemperature);
        currentCityWind.text(roundedWindSpeed);
        currentCityHumidity.text(data.main.humidity);

        cityOne.prepend('<button class="btn btn-secondary mb-2">' + city + '</button>')
    }
    

    function getFiveDayForecast(city) {
        var requestFiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=en&units=imperial&limit=1&appid=' + APIKey;

        fetch(requestFiveDayUrl)
            .then(function (response) {
                if(response.ok) {
                    console.log(response);
                    response.json().then(function(data) {
                        console.log(data)
                        displayFiveDayForecast(data)
                    })
                }
            })
    }

    function displayFiveDayForecast(data) {

        let dateAndTimeOne = data.list[7].dt_txt;
        let dayOfTheWeekOne = dayjs(dateAndTimeOne).format('dddd');

        let dateAndTimeTwo = data.list[15].dt_txt;
        let dayOfTheWeekTwo = dayjs(dateAndTimeTwo).format('dddd');

        let dateAndTimeThree = data.list[23].dt_txt;
        let dayOfTheWeekThree = dayjs(dateAndTimeThree).format('dddd');

        let dateAndTimeFour = data.list[31].dt_txt;
        let dayOfTheWeekFour = dayjs(dateAndTimeFour).format('dddd');

        let dateAndTimeFive = data.list[39].dt_txt;
        let dayOfTheWeekFive = dayjs(dateAndTimeFive).format('dddd');

        fiveDayOne.text(dayOfTheWeekOne);
        fiveDayTwo.text(dayOfTheWeekTwo)
        fiveDayThree.text(dayOfTheWeekThree)
        fiveDayFour.text(dayOfTheWeekFour)
        fiveDayFive.text(dayOfTheWeekFive)

        let forecastIconWeatherOne = data.list[7].weather[0].main;
        let forecastIconWeatherTwo = data.list[15].weather[0].main;
        let forecastIconWeatherThree = data.list[23].weather[0].main;
        let forecastIconWeatherFour = data.list[31].weather[0].main;
        let forecastIconWeatherFive = data.list[39].weather[0].main;

        fiveDayIconOne.removeClass('fas fa-sun').addClass(iconSelector(forecastIconWeatherOne))
        fiveDayIconTwo.removeClass('fas fa-sun').addClass(iconSelector(forecastIconWeatherTwo))
        fiveDayIconThree.removeClass('fas fa-sun').addClass(iconSelector(forecastIconWeatherThree))
        fiveDayIconFour.removeClass('fas fa-sun').addClass(iconSelector(forecastIconWeatherFour))
        fiveDayIconFive.removeClass('fas fa-sun').addClass(iconSelector(forecastIconWeatherFive))

        let forecastTempOne = Math.round(data.list[7].main.temp);
        let forecastTempTwo = Math.round(data.list[15].main.temp);
        let forecastTempThree = Math.round(data.list[23].main.temp);
        let forecastTempFour = Math.round(data.list[31].main.temp);
        let forecastTempFive = Math.round(data.list[39].main.temp);

        fiveDayTempOne.text(forecastTempOne)
        fiveDayTempTwo.text(forecastTempTwo)
        fiveDayTempThree.text(forecastTempThree)
        fiveDayTempFour.text(forecastTempFour)
        fiveDayTempFive.text(forecastTempFive)

        let roundedForecastWindSpeedOne = data.list[7].wind.speed.toFixed(1);
        let roundedForecastWindSpeedTwo = data.list[15].wind.speed.toFixed(1);
        let roundedForecastWindSpeedThree = data.list[23].wind.speed.toFixed(1);
        let roundedForecastWindSpeedFour = data.list[31].wind.speed.toFixed(1);
        let roundedForecastWindSpeedFive = data.list[39].wind.speed.toFixed(1);

        fiveDayWindOne.text(roundedForecastWindSpeedOne)
        fiveDayWindTwo.text(roundedForecastWindSpeedTwo)
        fiveDayWindThree.text(roundedForecastWindSpeedThree)
        fiveDayWindFour.text(roundedForecastWindSpeedFour)
        fiveDayWindFive.text(roundedForecastWindSpeedFive)

        fiveDayHumidityOne.text(data.list[7].main.humidity)
        fiveDayHumidityTwo.text(data.list[15].main.humidity)
        fiveDayHumidityThree.text(data.list[23].main.humidity)
        fiveDayHumidityFour.text(data.list[31].main.humidity)
        fiveDayHumidityFive.text(data.list[39].main.humidity)
    }

    function iconSelector(i) {
        switch (i) {
            case "Mist":
                return 'fa-solid fa-smog';
            case "Rain":
                return 'fa-solid fa-cloud-showers-heavy';
            case "Snow":
                return 'fa-solid fa-snowflake';
            case "Clear":
                return 'fa-solid fa-sun';
            case "Clouds":
                return 'fa-solid fa-cloud';
            case "Drizzle":
                return 'fa-solid fa-cloud-sun-rain';
            case "Thunderstorm":
                return 'fa-solid fa-cloud-bolt';
            default:
                console.log(i)
                break;
        }
    }

    searchForm.on('submit', searchSubmitHandler);
    clearCityHistoryBtn.on('click', clearHistory);
})