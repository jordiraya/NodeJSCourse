const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// https://mongoosejs.com/docs/queries.html

var id = '5bd982f825ff302001fc4d86';
if (!ObjectID.isValid(id)) {
    console.log('ID not valid');    
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by Id', todo);
}).catch((e) => console.log(e));


User.findById('5bd8666725cdb69c1c1f9134').then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log('User by id:', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));