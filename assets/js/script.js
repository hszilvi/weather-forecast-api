const myKey = '48cd8ede57002cd1bb9c3b730f584a0c';
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
let middays = [];
let fiveTemp = [];
let fiveHum = [];
let fiveWind = [];
let fiveAttrSrc = [];

// --------------------------fetch data and print it to screen section -------------------------------
// function to update default data in today section--------------------- 
let count = 0
function defaultToday() {
    const queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${displayedCity}&appid=${myKey}`
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
                    // today data -----------------------------------------------------------
                    middays = [];
                    fiveTemp = [];
                    fiveHum = [];
                    fiveWind = [];
                    fiveAttrSrc = []
                    console.log(data); // to check data I need in console 
                    // today = dayjs(data.list[0].dt_txt);
                    // console.log(today);
                    cityCurrent.text(data.city.name);
                    dayZero.text(dayjs(data.list[0].dt_txt).format('D/M/YYYY'));
                    temp.text(Math.round(data.list[0].main.temp)); //round the value
                    hum.text(data.list[0].main.humidity);
                    wind.text(Math.round(data.list[0].wind.gust)); //round the value
                    descr.text(data.list[0].weather[0].description);
                    icon = data.list[0].weather[0].icon;
                    $('#displayed-icon').attr("src",  `https://openweathermap.org/img/wn/${icon}@4x.png`); // display img using icon variable that stores icon id, 4x at the end of http contains the size
                    console.log((data.list[0].dt_txt)); //current data and time
                    console.log(data.list[0].weather[0].icon); // icon id
                    // get five day forecast and pass data to html only daytime values---------------------------
                    for (let i = 1; i< 40; i++) {
                        if(data.list[i].dt_txt.includes('12:00:00')) {
                            middays.push(dayjs(data.list[i].dt_txt).format('D/M/YYYY'));
                            fiveTemp.push(Math.round(data.list[i].main.temp));
                            fiveHum.push(data.list[i].main.humidity);
                            fiveWind.push(Math.round(data.list[i].wind.gust));
                            fiveAttrSrc.push(data.list[i].weather[0].icon);
                        }
                    }
                    $('.forecast').empty()
                    for (let i=0; i < middays.length; i++) {
                        // create html element for 5 days forecast
                        const createEl = 
                            `<div class="card m-1 bg-info-subtle shadow-sm" style="width: 12.5em;">
                            <h5 class="card-title mt-2 mb-2 text-center lh-2">` +middays[i]+ `</h5>
                            <img class="card-img-top mx-auto mt-2 mb-3 bg-info border rounded" src="`+`https://openweathermap.org/img/wn/${fiveAttrSrc[i]}@4x.png`+`" style="width: 3em;" alt="Card image cap" style="width: 2em;">
                            <div class="card-body">                        
                                <p class="card-text">Temperature: <span class="temp-value">` +fiveTemp[i]+`</span>°C</p>
                                <p class="card-text">Humidity: <span>` +fiveHum[i]+`</span>%</p>
                                <p class="card-text">Wind: <span>` +fiveWind[i]+`</span>km/h</p>
                                </div>
                            </div>`
                        $('.forecast').append(createEl);
                        
                    }
                    // -----------------------------------------------------------------------
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
    ;
}
// function to change display city / this should be called to change default city value
function changeDisplayCity(newVal) {
    displayedCity = newVal;
}

defaultToday(displayedCity);

