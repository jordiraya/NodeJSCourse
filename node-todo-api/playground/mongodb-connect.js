const MongoClient = require('mongodb').MongoClient;

// for version 2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name: 'Jordi',
        age: 45,
        location: 'Barcelona'
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });    
    
    db.close();
});

// for version 3
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
//     if (err) {
//         return console.log('Unable to connect to MongoDB server');
//     }
//     console.log('Connected to MongoDB server');
//     const db = client.db('TodoApp');
//     db.collection('Todos').insertOne({
//         text: 'Soemthing to do',
//         completed: false
//     }, (err, result) => {
//         if (err) {
//             return console.log('unable to insert todo', err);
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });    
//     client.close();
// });