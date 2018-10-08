const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// the port will be set fof heroku, if the env variable doesn't exists set to 3000
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// middleware
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${ now }: ${ request.method} ${ request.url }`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('unable to append to server.log');
        }
    });
    next(); // go to next middleware, if not exist flush response 
});

/*
app.use((request, response, next) => {
    response.render('maintenance.hbs');
    // we don't call next so the other handlers won't be executed
});
*/

app.set('view engine', 'hbs');

// the path must be absolute, use __dirname
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render ('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my awesome website'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is listening at port ${ port }`);
});