import apiKey from './apikey';
import { Task } from "../types";
import { compose } from "ramda";

const makeWeatherUrl =  zip=>
    `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${apiKey}`;

const fetchIt = (zip) =>
    Task((rej, res) =>
        fetch(url)
            .then(res)
            .then((x) => x.json())
            .catch(rej)
    );

const OpenWeather = {
    fetch: compose(fetchIt, makeWeatherUrl),
};

export { OpenWeather }
