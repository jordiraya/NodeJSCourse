const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// removes all docs
Todo.remove({}).then((result) => {
    console.log(result);
});

Todo.findOneAndRemove({
    _id: '5bdf61d4ad63008f185ac431'
}).then((todo) => {
    console.log(todo);
});

// caution: returns success even if id not found
Todo.findByIdAndRemove('5bdf61d4ad63008f185ac431').then((todo) => {
    console.log(todo);
});