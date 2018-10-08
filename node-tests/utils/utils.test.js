const utils = require('./utils');

it('should add two numbers', () => {
    var res = utils.add(33, 11);
    if (res !== 44) {
        throw new Error(`expected 44, got ${res}`);
    }
});

it('should square a number', () => {
    var res = utils.square(3);
    if (res !== 9) {
        throw new Error(`expected 9, got ${res}`);
    }
});