const express = require('express');
const app = express();
const path = require('path');

//>create a simple page
// app.get('/', (req, res) => {
//     res.status(200).send('<h1>Homepage</h1>');
// });

// app.get('/about', (req, res) => {
//     res.status(200).send('<h1>About</h1>');
// });

// app.all('*', (req, res) => {
// 	res.status(404).send('<h1>Page not found</h1>');

// });

//> use existing resoures
//@set up static and middleware
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './navbar-app/index.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
app.listen(3000, () => {});
