

    const myKey = '';
    // const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=London,England&appid=${myKey}`
    const cities = []
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
                // need another fetch to get the weather data
                console.log(data);  
                const newQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${myKey}&units=metric`;
                    fetch(newQueryURL).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        cityCurrent.text(data.city.name);
                        dayZero.text(dayjs(data.list[0].dt_txt).format('D/M/YYYY'));
                        // dayZero.text(data.list[0].dt_txt);
                        temp.text(Math.round(data.list[0].main.temp));
                        hum.text(data.list[0].main.humidity);
                        wind.text(Math.round(data.list[0].wind.gust));
                        descr.text(data.list[0].weather[0].description);
                        icon = data.list[0].weather[0].icon;
                        $('#displayed-icon').attr("src",  `https://openweathermap.org/img/wn/${icon}@4x.png`);
                        // to change icon I need a different fetch to get the pics
                        // icon.src = 
                        console.log(data);
                        // console.log(data.city.name);
                        console.log(data.list[0].dt_txt); //current data and time
                        console.log(data.list[0].weather[0].icon); // icon id
                        // console.log(data.list[0].main.temp)
                        // console.log(data.list[0].main.humidity)
                        // console.log(data.list[0].wind.speed)
            })
        })
    }
    defaultToday('hanoi');

    // let inputCity = document.getElementById('displayed-city').innerHTML.trim();
    // function fetchCity () {
    //     const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=London,England&appid=${myKey}`;
    //     fetch(queryURL).then(function (response) {
    //         return response.json();
    //     }).then(function (data) {
    //         console.log(data);  
    //     })

    // }

    // function addCityBtn () {

    // }
    // add eventlistener to search button to get city data
    // const searchBtn = document.getElementById('search-button');
    // searchBtn.addEventListener('click', () => {
    //     fetchCity();
    // })

    // create button elements from user City inputs OK OK OK
    function renderBtns() {
        $('#history').empty();
        $.each(cities, function(i, city) {
            const createBtnDiv = $('<div>').addClass('city-input input-group justify-content-center mb-1 mt-2');
            const createCityBtn = $('<button>').addClass("city-button btn btn-outline-danger").attr('data-name', city).text(city);
            // createBtnDiv.append(createCityBtn);
            $('#history').prepend(createBtnDiv.append(createCityBtn));
        })
    }
    // const storedCities = JSON.parse(localStorage.getItem('cities')) || []
    // search button is clicked call renderBtns function and push cities into cities array OK OK OK 
    $('#search-button').on('click', function(e) {
        e.preventDefault();
        const userCity = $('#search-input').val().trim();
        console.log(userCity);
        // check to avoid duplication and don't have empty buttons
        if (!cities.includes(userCity) && userCity) {
            cities.push(userCity);
        }
        console.log(cities);
        // empty input val to replace placeholder
        $('#search-input').val('')

        // store data in local storage
        localStorage.setItem('cities', cities);
        // cities = JSON.parse(localStorage.getItem(userCity));
        // call render buttons
        renderBtns();
    })
    // renderBtns();

    // clear cities list / need to rewrite in jquery!!!!! else it works OK OK OK 
    const clearBtn = document.getElementById('clear-button');
    clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('clear is clicked');
        $('#history').empty();
    })

    $(document).on('click', '.city-button', consoleTest);
    

    function consoleTest() {
        console.log('just fluffing')
    }


    // fetch(queryURL).then(function (response) {
    //     return response.json();
    //     }).then(function (data) {
    //         // need another fetch to get the weather data
    //         console.log(data);  
    //         const newQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${myKey}&units=metric`;
    //             fetch(newQueryURL).then(function (response) {
    //                 return response.json();
    //             }).then(function (data) {
    //                 console.log(data);
    //                 console.log(data.city.name);
    //                 console.log(data.list[0].dt_txt); //current data and time
    //                 console.log(data.list[0].weather[0].icon); // icon id
    //                 console.log(data.list[0].main.temp)
    //                 console.log(data.list[0].main.humidity)
    //                 console.log(data.list[0].wind.speed)
    //     })
    //     const cities = ["London", "Budapest"];
    // })

    // update data with default city London on website 





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

