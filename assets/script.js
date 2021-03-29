function initPage() {
    const inputEl = document.getElementById("search-city");
    const searchEl = document.getElementById("search-city-button");
    const clearEl = document.getElementById("clear-history");
    const nameEl = document.getElementById("current-city");
    const currentTempEl = document.getElementById("current-temp");
    const currentHumidityEl = document.getElementById("current-humidity"); 4
    const currentWindEl = document.getElementById("current-wind-speed");
    const currentUVEl = document.getElementById("uv-index");
    const historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

     //Weather displays through this API with a key from OpenWeather
    const APIKey = "fa951a35553c131729e62bc93edb34ca";
    function getWeather(cityName) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {
                console.log(response);
                const currentDate = new Date(response.data.dt * 1000);
                console.log(currentDate);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
                axios.get(UVQueryURL)
                    .then(function (response) {
                        let UVIndex = document.createElement("span");
                        UVIndex.setAttribute("class", "badge badge-danger");
                        UVIndex.innerHTML = response.data[0].value;
                        currentUVEl.innerHTML = "UV Index: ";
                        currentUVEl.append(UVIndex);
                    })

    searchEl.addEventListener("click", function () {
        const searchTerm = inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    document.querySelector('#search-city').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const searchTerm = inputEl.value;
            getWeather(searchTerm);
            searchHistory.push(searchTerm);
            localStorage.setItem("search", JSON.stringify(searchHistory));
            renderSearchHistory();
        }
    });

    clearEl.addEventListener("click", function () {
        searchHistory = [];
        renderSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }
}
initPage();