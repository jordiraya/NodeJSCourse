const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(argv.address, (errorMessage, geoResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else { 
        console.log(geoResults.address);
        
        weather.getWeather(geoResults.latitude, geoResults.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${ weatherResults.temperature }. It feels like ${ weatherResults.apparentTemperature }`);
            }
        });        

    }
});

