const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // findOneAndUpdate(filter, update, options, callback)
    // see operators: https://docs.mongodb.com/manual/reference/operator/
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bd7013d4e9af49def246a73')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bd6f1e14e9af49def2468f6')
    }, {
        $set: { name: 'Miguelito' },
        $inc: { age: 1 }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });  

    // db.close();
});