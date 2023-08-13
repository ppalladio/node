const express = require('express');
const app = express();
//req=>middleware=>res
//> middleware
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toFullYear();
    console.log(method, url, time);
    next();
};
app.get('/', logger, (req, res) => {
    res.send('home');
});
app.get('/about', (req, res) => {
    res.send('about');
});
app.listen(5000);
