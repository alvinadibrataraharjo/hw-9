var express = require('express')
var app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');


app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// import from movie.js
var movie = require('./movies.js')
var users = require('./users.js')
var register = require('./register.js')
var login = require('./login.js')

// routing
app.use('/movie', movie)
app.use('/users', users)
app.use('/register', register)
app.use('/login', login)

app.listen(3000)