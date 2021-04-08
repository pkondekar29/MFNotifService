const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');

// Port number
const PORT = (process.env.PORT || 3000);

// Root url of API
const apiEndPoint = '/api/v1';

// initialising app
const app = express();
const server = http.createServer(app);

// allows application to use json body from request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting routes of application
app.use(apiEndPoint, routes);

// starting server
server.listen(PORT);

module.exports = server;