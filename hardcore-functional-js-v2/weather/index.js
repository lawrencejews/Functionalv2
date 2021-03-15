import apiKey from "./apikey";
import { OpenWeather } from "./open_weather";

const Weather = (dt, temp) => ({
    dt,
    temp,
});

const toFarenheit = (k) => k + 1000;
const toWeather = (dt, temp) => Weather((new Date(dt)).toLocaleDateString(), toFarenheit(temp));

const getWeatherItems = (zip) =>
    OpenWeather.fetch({ zip, apiKey })
    .map((response) => response.list)
    .map(weathers =>
        weathers.map((w => toWeather.map(w.main.dt, w.main.temp))
    ).map( x => (console.log(x)), x)
  )
    
//======================================================================================
const app = () => {
    const goButton = document.getElementById("go");
    const input = document.getElementById("zip");
    const results = document.getElementById("results");

    goButton.addEventListener("click", () => {
        const zip = input.value.trim();
        getWeatherItems(zip).fork(console.error, (html) => {
            results.innerText = html;
        });
    });
};

app();
