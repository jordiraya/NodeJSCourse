const {MongoClient, ObjectID} = require('mongodb');

// for version 2
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    // toArray() returns a Promise
    console.log('list all');
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fecth todos', err);
    });

    // filter
    console.log('filer completed');
    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fecth todos', err);
    });
    
    // count  
    console.log('count');
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to count', err);
    }); 

    // db.close();
});

