const request = require('request');

const keyGoogleAPIs = 'AIzaSyDsTfkIhBTzhXCGgOMA-csQZ3PLkLJ0mCE';

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=${ keyGoogleAPIs }&address=${ encodedAddress}`,
        json: true,
        method: "GET",
        proxy:'http://CQF:PASSWORD@pxcost.costaisa.org:9090',
        strictSSL: false
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers', undefined);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address', undefined);
        } else if (body.status === 'OK') {
            var geoAddress = {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            }
            callback(undefined, geoAddress);
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;