const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

const { Game } = require("../models");

router.get('/games', async (_, res) => {
    res.json(await Game.findAll());
});

router.post('/games', async (req, res) => {
    const game = await Game.create({
        username: req.body.username,
        password: req.body.password
    });

    res.status(201).json(game);
});

router.put('/games/:id', async (req, res) => {
    const game = await Game.update({
        username: req.body.username,
        password: req.body.password
    }, {
        where: {
            id: req.params.id
        }
    });

    res.status(201).json(game);
});

router.delete('/games', async (req, res) => {
    const game = await Game.destroy({
        where: {
            id: req.body.id
        }
    });

    res.json(game);
});

module.exports = router;