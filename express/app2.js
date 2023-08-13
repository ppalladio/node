const express = require('express');
const app = express();
const logger = require('./logger')
const auth = require('./authorize')
//req=>middleware=>res
//> middleware
// app.use(logger)
//> use multiple functions
app.use([auth,logger])
app.get('/', (req, res) => {
    res.send('home');
});
app.get('/about', (req, res) => {
    res.send('about');
});
app.listen(5000);
