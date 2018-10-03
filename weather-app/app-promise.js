const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const keyGoogleAPIs = 'AIzaSyDsTfkIhBTzhXCGgOMA-csQZ3PLkLJ0mCE';
const keyForecast = 'f59db8a295b75969252b6bc0fefad8d8';

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${ keyGoogleAPIs }&address=${ encodedAddress}`;

// axios supports promises, request don't
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng
    var weatherUrl = `https://api.darksky.net/forecast/${ keyForecast }/${ latitude },${ longitude }`;       
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${ temperature }. It feels like ${ apparentTemperature }`);
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable tor connect to API servers');
    } else {
        console.log(error.message);
    }  
});