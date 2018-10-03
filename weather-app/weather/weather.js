const request = require('request');

const keyForecast = 'f59db8a295b75969252b6bc0fefad8d8';

var getWeather = (latitude, longitude, callback) => {
    request({
        url: ` https://api.darksky.net/forecast/${ keyForecast }/${ latitude },${ longitude }`,
        json: true,
        method: "GET",
        proxy:'http://CQF:PASSWORD@pxcost.costaisa.org:9090',
        strictSSL: false
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast servers', undefined);
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather', undefined);
        } else if (response.statusCode === 200) {
            var temperature = {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            }
            callback(undefined, temperature);
        }
    });
};

module.exports.getWeather = getWeather;