const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            // validator: (value) => {
            //     validator.isEmail(value);
            // }, 
            validator: validator.isEmail, // only need to define the function
            message: '{VALUE} is not a valid email'
        }       
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6        
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// no return tokens or passwords
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// instance method
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    // process.env.JWT_SECRET are the salt bytes
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

// class method
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        // process.env.JWT_SECRET are the salt bytes
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(e) {
        // it's the same
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });   
}

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        
        // bcrypt doesn't support promises, only callback
        // reject is catched by the catch statement
        return new Promise((resolve, reject) => {
            // user.password is hashed
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

UserSchema.methods.removeToken = function(token) {
    var user = this;
     return user.update({
        // $pull is a mongoose operator that removes an element from an array that
        // matches the criteria
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

// mongoose middleware -> add code on events (pre-save)
UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};