const express = require('express');
const path = require('path');
const app = express();
const router = require('../routes/defaultRouter.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    if (req.method === 'POST' && req.body && typeof req.body._method !== 'undefined') {
        req.method = String(req.body._method).toUpperCase();
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', router);

module.exports = app;