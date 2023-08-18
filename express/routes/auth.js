const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
	//@input.name
    const { name } = req.body;
    if (name) {
        res.status(200).send(`welcome ${name}`);
    }
    res.status(401).send('provide credentials');
});

module.exports = router;