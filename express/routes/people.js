const express = require('express');

const router = express.Router();
let {people} = require('../data');

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people });
});
router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find((person) => person.id === Number(id));

    if (!person) {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;