const request = require('request');

const keyGoogleAPIs = 'AIzaSyDsTfkIhBTzhXCGgOMA-csQZ3PLkLJ0mCE';

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=${ keyGoogleAPIs }&address=${ encodedAddress}`,
            json: true,
            method: "GET",
            proxy:'http://CQF:PASSWORD@pxcost.costaisa.org:9090',
            strictSSL: false
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if (body.status === 'OK') {
                var geoAddress = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                resolve(geoAddress);
            }
        });    
    });
};

geocodeAddress('carrer Premià 10 08014 Barcelona').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});