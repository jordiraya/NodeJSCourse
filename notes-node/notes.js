console.log('Starting notes.js');

// console.log(module);

module.exports.age = 45;

module.exports.addNote = () => {
	console.log('addNote');
	return 'New note';
}

module.exports.add = (a, b) => {
	return a + b;
}