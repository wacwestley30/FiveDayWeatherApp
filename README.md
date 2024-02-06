## Five Day Weather App

https://wacwestley30.github.io/FiveDayWeatherApp/

## Description

This is my Five Day Weather App that uses OpenWeatherMap API, DayJS, Jquery, Bootstrap and FontAwesome. This project taught me how to dynamically pull from an API while also furthering my knowledge of localStorage. The OpenWeatherMap API had two collections that I had access to called Current Weather Data and 5 Day Forecast that helped me create this simple weather app.

## Usage

The first time this app is loaded placeholder text will be shown because I did not want to try to access the users current location with this app. There is an input box to the top left of the app that lets the user search for cities. As long as the city is recognized by the API the most relevant (according to the API) city will display along with the city's 5 day forecast. The city will be added to a recent history list of buttons for the user to revisit cities they have searched. A clear history button is also added to clear the users localStorage, the array and the populated buttons. Icons are selected based on the "main" description from the API. I also added the current date to the page just for convenience.

![alt text](./assets/Screenshot%202024-02-06%20034241.png)