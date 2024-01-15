const myKey = '';

  let displayedCity ='London';

    // first get the geo data, like city from fetch and console.log all the needed data - just to check if it works!
    const cityCurrent = $('#displayed-city');
    const dayZero = $('#displayed-date');
    const temp = $('#displayed-temp');
    const hum = $('#displayed-hum');
    const wind = $('#displayed-wind');
    let icon = $('#displayed-icon');
    const descr = $('#displayed-descr');

    // function to update default data in today section--------------------- OK OK OK OK 
    function defaultToday(city) {
        const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myKey}`
        // ----------------------------------------------
        fetch(queryURL).then(function (response) {

            return response.json();
            }).then(function (data) {  
                console.log(data[0].lat, data[0].lon); //check coordinates
                // getting data for 0 and + 5 days
                // need another fetch to get the weather data
                console.log(data);  
                const newQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${myKey}&units=metric`;

                    fetch(newQueryURL).then(function (response) {
                        return response.json();
                    }).then(function (data) {

                        cityCurrent.text(data.city.name);
                        dayZero.text(dayjs(data.list[0].dt_txt).format('D/M/YYYY'));
                        temp.text(Math.round(data.list[0].main.temp));
                        hum.text(data.list[0].main.humidity);
                        wind.text(Math.round(data.list[0].wind.gust));
                        descr.text(data.list[0].weather[0].description);
                        icon = data.list[0].weather[0].icon;

                        $('#displayed-icon').attr("src",  `https://openweathermap.org/img/wn/${icon}@4x.png`); // display img using icon variable that stores icon id, 4x at the end of http contains the size
                        console.log(data);
                        // console.log(data.city.name);
                        console.log(data.list[0].dt_txt); //current data and time
                        console.log(data.list[0].weather[0].icon); // icon id
                        // get five day forecast and pass data to html

            })
        })
    }
    

    // create button elements from user City inputs OK OK OK
    function renderBtns() {
        $('#history').empty();
        $.each(searchedCities, function(i, city) {
            const createBtnDiv = $('<div>').addClass('city-input input-group justify-content-center mb-1 mt-2');
            const createCityBtn = $('<button>').addClass("city-button btn btn-outline-danger").attr('data-name', city).text(city);
            // createBtnDiv.append(createCityBtn);
            $('#history').prepend(createBtnDiv.append(createCityBtn));
        })
    }
    const storedCities = JSON.parse(localStorage.getItem('searched-cities')) || []
    // search button is clicked call renderBtns function and push cities into cities array and update displayedCity 
    let searchedCities = storedCities;
    $('#search-button').on('click', function(e) {
        e.preventDefault();
        const userCity = $('#search-input').val().trim();
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

    $(document).on('click', '.city-button', setChosenCityToDisplay);
    
    function setChosenCityToDisplay() {
        const chosenCity = $(this).attr('data-name');
        console.log(chosenCity);
        displayedCity = chosenCity;
        renderBtns();
        return displayedCity;

    }
    console.log(displayedCity);


    defaultToday(displayedCity);

    // function that creates buttons with city names from input field (id search-input) form and post it to 
        // search button id search-button clicked store the input field local storage and create form element with id history             
            // <form id="history" class="city-list form border rounded shadow-sm" style="width: 15em;">
            //         <div class="input-group justify-content-center mb-1 mt-2">
            //              <button class="btn btn-outline-danger" style="width: 90%;">London</button>
            //          </div>
            //           <div class="input-group justify-content-center">
            //               <button class="btn btn-outline-danger" style="width: 90%;">Budapest</button>
            //          </div>
            //          <div class="input-group mt-3 mb-3 ml-1">
            //              <button class="btn btn-danger">Clear</button>
            //          </div>
            // </form>

    // function to display data into today section 

