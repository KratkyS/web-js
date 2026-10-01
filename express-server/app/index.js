const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', router);

module.exports = app;