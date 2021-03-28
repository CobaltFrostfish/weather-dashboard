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
