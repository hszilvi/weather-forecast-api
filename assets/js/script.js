const myKey = '';
// set displayedCity to London as default value
let displayedCity ='London';
// global variables to display current day data
const cityCurrent = $('#displayed-city');
const dayZero = $('#displayed-date');
const temp = $('#displayed-temp');
const hum = $('#displayed-hum');
const wind = $('#displayed-wind');
let icon = $('#displayed-icon');
const descr = $('#displayed-descr');
// --------------------------fetch data and print it to screen section -------------------------------
// function to update default data in today section--------------------- 
function defaultToday() {
    const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${displayedCity}&appid=${myKey}`
    // ----------------------------------------------
    fetch(queryURL).then(function (response) {

        return response.json();
        }).then(function (data) {  
            console.log(data[0].lat, data[0].lon); //check coordinates
            console.log(data);  // to check data I need in console 
            const newQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${myKey}&units=metric`;

                fetch(newQueryURL).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data); // to check data I need in console 
                    cityCurrent.text(data.city.name);
                    dayZero.text(dayjs(data.list[0].dt_txt).format('D/M/YYYY'));
                    temp.text(Math.round(data.list[0].main.temp)); //round the value
                    hum.text(data.list[0].main.humidity);
                    wind.text(Math.round(data.list[0].wind.gust)); //round the value
                    descr.text(data.list[0].weather[0].description);
                    icon = data.list[0].weather[0].icon;
                    $('#displayed-icon').attr("src",  `https://openweathermap.org/img/wn/${icon}@4x.png`); // display img using icon variable that stores icon id, 4x at the end of http contains the size
                    console.log(data.list[0].dt_txt); //current data and time
                    console.log(data.list[0].weather[0].icon); // icon id
                    // get five day forecast and pass data to html
        })
    })
}

// ----------------------Search and cities list section-------------------------------
// create button elements from user City inputs 
function renderBtns() {
    $('#history').empty();
    $.each(searchedCities, function(i, city) {
        const createBtnDiv = $('<div>').addClass('city-input input-group justify-content-center mb-1 mt-2');
        const createCityBtn = $('<button>').addClass("city-button btn btn-outline-danger").attr('data-name', city).text(city);
        $('#history').prepend(createBtnDiv.append(createCityBtn));
    })
}
const storedCities = JSON.parse(localStorage.getItem('searched-cities')) || []
// search button is clicked call renderBtns function and push cities into cities array and update displayedCity 
let searchedCities = storedCities;
$('#search-button').on('click', function(e) {
    e.preventDefault();
    const userCity = $('#search-input').val().trim();
    changeDisplayCity(userCity);
    defaultToday(displayedCity)
    console.log(userCity);
    if (!searchedCities.includes(userCity) && userCity)  { // check to avoid duplication and don't have empty buttons
        searchedCities.push(userCity);
    }
    console.log(searchedCities);
    $('#search-input').val('') // empty input val to replace placeholder
    localStorage.setItem('searched-cities', JSON.stringify(searchedCities));// store data in local storage
    // call render buttons to display cities as buttons in html
    renderBtns();
})
renderBtns();

// clear cities list and local storage
$('#clear-button').on('click', function(e) {
    e.preventDefault();
    console.log('clear is clicked');
    $('#history').empty();
    localStorage.clear();
    searchedCities = [];
})

$(document).on('click', '.city-button', setChosenCityToDisplay); //any city button is clicked, call data

// function to display all data 
function setChosenCityToDisplay() {
    const chosenCity = $(this).attr('data-name');
    renderBtns();
    changeDisplayCity(chosenCity);
    defaultToday(displayedCity)
}
// function to change display city / this should be called to change default city value
function changeDisplayCity(newVal) {
    displayedCity = newVal;
}


defaultToday(displayedCity);
