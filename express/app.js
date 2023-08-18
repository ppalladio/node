const express = require('express');
const app = express();

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

//> use existing resources
//@set up static and middleware
// const path = require('path');
// app.use(express.static('./public'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './navbar-app/index.html'));
// });

// app.all('*', (req, res) => {
//     res.status(404).send('<h1>Page not found</h1>');
// });
// app.listen(3000, () => {});

//> SSR /Json
const { products } = require('./data');
//@json.stringify
// app.get('/', (req, res) => {
//     res.send('<h1>Homepage</h1><a href="/api/products"/>See all products</a>');
// });
// app.get('/api/products', (req, res) => {
//     const newProducts = products.map((product) => {
//         const { id, name, image } = product;
//         return { id, name, image };
//     });
//     return res.json(newProducts);
// });
//> route params
app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productID),
    );
    if (!singleProduct) {
        return res.status(404).send('<h1>Product not found</h1>');
    }
    return res.json(singleProduct);
});
//>query string

app.get('/api/v1/query', (req, res) => {
    // console.log(req.query);
    const { search, limit } = req.query; //@search for search and limit key
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.includes(search.toLocaleLowerCase());
        });
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json(sortedProducts);
});

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

//> put method

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const people = people.find((person) => person.id === Number(id));

    if (!people) {
        return res
            .status(404)
            .json({ success: false, message: `id ${id} not found` });
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });
    res.status(200).json({
        success: true,
        message: 'person updated',
        data: newPeople,
    });
});

//> delete method

app.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res
            .status(404)
            .json({ success: false, message: `id ${req.params.id} not found` });
    }
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id),
    );
    res.status(200).json({ success: true, data: newPeople });
});
app.listen(5000, () => {});
