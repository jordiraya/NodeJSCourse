var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // which Promise library to use
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose: mongoose
};