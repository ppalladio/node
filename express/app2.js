const express = require('express');
const app = express();
const logger = require('./logger')
const auth = require('./authorize')
//req=>middleware=>res
//> middleware
// app.use(logger)
//> app.use multiple functions
// app.use([auth,logger])

// app.get('/', (req, res) => {
//     res.send('home');
// });
//>router middleware
// app.get('/about',[auth,logger], (req, res) => {
//     res.send('about');
// });
//>third party middleware
// const morgan = require('morgan');

// app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('home');
});
app.listen(5000);
