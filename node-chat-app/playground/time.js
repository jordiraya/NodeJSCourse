// Unix epoch: Jan 1st 1970 00:00:00 am
// time in JS is expressed in milliseconds since this moment, positive or negative

// to get the time: new Date().getTime()

// date object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// to work with dates: moment (standard de facto) http://momentjs.com/
// allows formatting, substractin time, etc.
// npm install moment@2.15.1 --save 

var moment= require('moment');

// var date = new Date();
// console.log(date.getMonth());

// create a current date
var date1 = moment();
console.log(date1.format('h:mm a'));

// create a date from timestamp
var date2 = moment(1234);

// get timestamp
var timestamp1 = moment().valueOf();
console.log(timestamp1);