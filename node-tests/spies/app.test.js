const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');
// use app.__set__ and app.__get__ to map data

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db); // replace db in app

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Andrew', 25);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('Andrew', 25);
    });

    it('should saveUser with user object', () => {
        var email = 'andrew@example.com';
        var password = '123abc';
        app.handleSignup(email, password); // will call our rewired db
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});