const express = require('express');
const app = express();
const logger = require('./logger');
const auth = require('./authorize');
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

//> get method

const { people } = require('./data');
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});
//> post method
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static('./methods-public'));
// app.post('/login', (req, res) => {
//     console.log(req.body);
// 	//@input.name
//     const { name } = req.body;
//     if (name) {
//         res.status(200).send(`welcome ${name}`);
//     }
//     res.status(401).send('provide credentials');
// });

//> post/ js method
app.use(express.json());
app.use(express.static('./methods-public'));
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            success: false,
            message: 'please provide name',
        });
    }
    res.status(201).json({ success: true, person: name });
});
app.listen(5000);
