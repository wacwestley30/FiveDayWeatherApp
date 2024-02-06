$(function() {

    // Odds and ends
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
        currentDate = $('#currentDate'),
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
    
    function searchSubmitHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        city = cityInput.val();

        // This handles all the checks I need like if theres even a city in the input and to also make sure only new cities are added to the history buttons and finally to restrict the buttons to 8 recent searches.
        if (!city) {
            alert('Please enter a city');
        } else if (cityHistoryArray.includes(city)) {
            cityInput.val('');
            getCurrentWeather(city);
            getFiveDayForecast(city);
        } else if (cityHistoryArray.length >= 8) {
            cityHistoryArray.pop();
        } else if (city) {
            cityInput.val('');
            getCurrentWeather(city);
            getFiveDayForecast(city);
            cityHistoryArray.unshift(city);
            localStorage.setItem('cityHistory', JSON.stringify(cityHistoryArray));
            displaySearchHistory();
        }
    };

    // Really surprised how easy this was to update the history buttons so that even when you click or search for a city that was already in the list is updated and brought to the top of the list. That bug mentioned later about an extra button still pops up but the reload fixes it.
    function updateHistoryArray(data) {
        cityHistoryArray = JSON.parse(localStorage.getItem('cityHistory'));
        cityHistoryArray.unshift(cityHistoryArray.splice(cityHistoryArray.findIndex(city => city === data.name), 1)[0]);
        localStorage.setItem('cityHistory', JSON.stringify(cityHistoryArray));
        displaySearchHistory();
    }

    // Resets everything back to a workable state no need to reload the page or anything.
    function clearHistory() {
        cityHistoryArray = [];
        localStorage.clear();
        cityOne.empty();
        cityTwo.empty();
        cityThree.empty();
        cityFour.empty();
        cityFive.empty();
        citySix.empty();
        citySeven.empty();
        cityEight.empty();
    };

    function getCurrentWeather(city) {
        var requestCurrentUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&units=imperial&limit=1&appid=' + APIKey;
        fetch(requestCurrentUrl)
            .then(function (response) {
                if(response.ok) {
                    response.json().then(function(data) {
                        displayCurrentWeather(data, city);
                        updateHistoryArray(data);
                        console.log('current');
                        console.log(data);
                    })
                } else {
                    // This whole respone != ok was 1 line before the very end and doing bug tests. The code works as long as an actual endpoint is reached the other 4 lines were added to catch if a user puts in a bad city and to also repopulate the history buttons
                    cityHistoryArray.shift();
                    localStorage.setItem('cityHistory', JSON.stringify(cityHistoryArray));

                    // Very odd bug where an extra button will spawn for the last city in cityHistoryArray so this is the only time the page is reloaded (NEXT LINE) because I don't really know why it is spawning because the Array and localStorage is being updated before the new check for buttons to populate but the extra button is still populating and only the last city no other cities.
                    location.reload();
                    displaySearchHistory();
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to Open Weather Map API');
            })
    }

    // There is probably a way to iterate but I get confused on how to also iterate through the divs. This happens a few more times in the code so I hard coded just to get it working.
    function displaySearchHistory() {
        if(cityHistoryArray[0] != undefined){
            cityOne.empty();
            cityOne.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[0] + '</button>');
        }
        if(cityHistoryArray[1] != undefined){
            cityTwo.empty();
            cityTwo.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[1] + '</button>');
        }
        if(cityHistoryArray[2] != undefined){
            cityThree.empty();
            cityThree.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[2] + '</button>');
        }
        if(cityHistoryArray[3] != undefined){
            cityFour.empty();
            cityFour.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[3] + '</button>');
        }
        if(cityHistoryArray[4] != undefined){
            cityFive.empty();
            cityFive.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[4] + '</button>');
        }
        if(cityHistoryArray[5] != undefined){
            citySix.empty();
            citySix.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[5] + '</button>');
        }
        if(cityHistoryArray[6] != undefined){
            citySeven.empty();
            citySeven.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[6] + '</button>');
        }
        if(cityHistoryArray[7] != undefined){
            cityEight.empty();
            cityEight.prepend('<button class="btn btn-secondary mb-2">' + cityHistoryArray[7] + '</button>');
        }

        // Don't really know why this has to be here. Normally I put all handlers at the end together but when other displaySearchHistory() is populated the buttons don't work except for the first time they are populated even though this should pull all .btn-secondary regardless.
        $('.btn-secondary').on('click', historyBtnClickEvent);
    }

    function displayCurrentWeather(data) {
        if (data.length === 0) {
            currentCity.text('City not Found');
            return;
        }

        let currentTemperature = Math.round(data.main.temp);
        let roundedWindSpeed = data.wind.speed.toFixed(1);
        let currentDateZero = dayjs().format('dddd MMMM D, YYYY');

        currentCity.text(data.name + ', ' + data.sys.country);
        currentDate.text(currentDateZero);
        currentCityTemp.text(currentTemperature);
        currentCityWind.text(roundedWindSpeed);
        currentCityHumidity.text(data.main.humidity);
    }

    // Really like seperating the get functions from the display functions like some of the examples we have been given up to this point so I used that idea to break up tasks for my project
    function getFiveDayForecast(city) {
        var requestFiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=en&units=imperial&limit=1&appid=' + APIKey;

        fetch(requestFiveDayUrl)
            .then(function (response) {
                if(response.ok) {
                    response.json().then(function(data) {
                        displayFiveDayForecast(data);
                        console.log('5day');
                        console.log(data);
                    })
                }
            })
    }

    // Huge limitation that I haven't got to fully test to fully check but this is a limitation from using the free OpenWeatherMap API. I only get access to 5 day in 3h increment. The problem is if I use a low list number like list[0-6] the API could display the same day depending on when you load the page. 3x7 = 21. So based on that I felt comforable enough starting from list[7] because it would be 21 hours forward so it could still be messed up till 3am but that is also a good app update time. The other issue is it also goes off when the user loads the page. So currently it is 3AM and current list[7] is for 6AM. The problem is that it displays the temp data for 6am and not the average or max for the day. The time of list[7] changes. Could not find anything in the API to specifically target say 3PM there is a 3PM block but the data received changes when the page is loaded. There is a Daily Forecast 16 days but that is only for PAID plans. I left the console.log for both data being pulled to explain what I mean.
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

    // Found a list of Common main labels in the API Docs the user could receive and added a switch case for each. I have a console.log in place in case one pops up that I did not account for.
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

    // This checks when user reloads the page or comes back to it if they have localStorage already from the last time they accessed the page.
    if (cityHistoryArray.length == 0 && localStorage.getItem('cityHistory') != null) {
        let previousHistoryArray = JSON.parse(localStorage.getItem('cityHistory'))
        cityHistoryArray = previousHistoryArray;
        city = cityHistoryArray[0];
        displaySearchHistory();
        getCurrentWeather(city);
        getFiveDayForecast(city);
    };

    // Updates the page when a history button is clicked so that a new button isn't added or localStorage being updated for no reason.
    function historyBtnClickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        city = event.target.innerHTML;
        getCurrentWeather(city);
        getFiveDayForecast(city);
    }

    searchForm.on('submit', searchSubmitHandler);
    clearCityHistoryBtn.on('click', clearHistory);
})