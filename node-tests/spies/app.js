var db = require('./db.js');

module.exports.handleSignup = (email, password) => {
    // check if the email already exists
    // save the user to the database
    db.saveUser({email, password}); // param object in shortcut form
    // send the welcome email
}