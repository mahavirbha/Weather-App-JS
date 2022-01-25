const api = {
    key: "ad6f476ad3eff33f045dca0d4023ae65",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event){
    event.preventDefault();
    if(event.type == "click"){
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
       
}

function displayData (response) {
    console.log(response);
    if(response.cod === "404"){
        const error = document.querySelector(".error");
        error.textContent = "non-recognized location";
        search.value = "";
    }
    else{
        const error = document.querySelector(".error");
        error.textContent = "";
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText =    `Weather: ${response.weather[0].description}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        console.log(weatherIcon);
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";
        search.value = "";
        // weatherIcon.appendChild = `<img src=${iconURL + response.weather[0].icon + ".jpg"} alt="" class="weather-icon">`
    }
}

function dateFunction (d) {
    let months= ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    // let year = d.getYear();
    let year = d.getFullYear();
    

    // return `${day}, ${month} ${date} ${year+1900}`;
     return `${day}, ${month} ${date} ${year}`;
}