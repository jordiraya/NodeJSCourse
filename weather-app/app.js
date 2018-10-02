const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=premia%2010%2008014%20barcelona&key=AIzaSyDsTfkIhBTzhXCGgOMA-csQZ3PLkLJ0mCE',
    json: true
}, (error, response, body) => {
    console.log(error);
});