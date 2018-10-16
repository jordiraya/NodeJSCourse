const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
    var res = utils.add(33, 11);
    expect(res).toBe(44).toBeA('number');
    /*
    if (res !== 44) {
        throw new Error(`expected 44, got ${res}`);
    }
    */
});

it('should square a number', () => {
    var res = utils.square(3);
    expect(res).toBe(9).toBeA('number');
    /*
    if (res !== 9) {
        throw new Error(`expected 9, got ${res}`);
    }
    */
});

it('should expect some values', () => {
    expect(2).toNotBe(1);
    // error: different objects
    // expect({name: 'Andrew'}).toBe({name: 'Andrew'});
    expect({name: 'Andrew'}).toEqual({name: 'Andrew'});
    expect([2,3,4]).toInclude(2);
    expect({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'})
    .toInclude({
        age: 25
    });
});

it('should first and last names are set', ()=> {
    var user = {location: 'Barcelona', age: 45};
    utils.setName(user, 'Jordi Raya');
    expect(user).toInclude({
        firstName: 'Jordi',
        lastName: 'Raya'
    });
});