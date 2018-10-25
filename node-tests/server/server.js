const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/users', (req, res) => {
    res.send([{
        name: 'Teodosio',
        age: 45
    }, {
        name: 'Arcadio',
        age: 43       
    }, {
        name: 'Honorato',
        age: 57        
    }]);
});


app.listen(3000, () => {
    console.log('Server is listening at port 3000');
});

module.exports.app = app;