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
    if ((sortedProducts.length < 1)) {
        return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json(sortedProducts);
});

app.listen(5000, () => {});
