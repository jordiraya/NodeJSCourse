console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

var user = os.userInfo();
// console.log(user);

var res = notes.addNote();
console.log(res);

console.log('Result:', notes.add(9, -2));

/*
// synch
fs.appendFileSync('greetings.txt', 'Hello ' + user.username + '!\n');
*/

// sync with template syntax (use `)
// fs.appendFileSync('greetings.txt', `Hello ${user.username}! you are ${notes.age}\n`);

/*
// async
fs.appendFile('greetings.txt', 'Hello world!\n', function(err) {
	if (err) {
		console.log('unable to write a file');
	}
});
*/