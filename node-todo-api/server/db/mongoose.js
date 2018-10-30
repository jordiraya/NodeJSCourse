var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // which Promise lirary to use
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose: mongoose
};