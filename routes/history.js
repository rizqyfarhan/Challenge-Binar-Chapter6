const router = require("express").Router();

const { History } = require("./../models");

router.get('/histories', async (_, res) => {
    const historyData = await History.findAll();

    res.render('history', {
        histories: historyData
    });
});

router.get('/history/add', async (_, res) => {
    res.render('history/add-history');
});

router.post('/history/post', async (req, res) => {
    await History.create({
        GameId: req.body.gameId,
        playedAt: Date.now(),
        score: req.body.score,
    });
    res.redirect('/histories');
});

router.get('/history/edit/:id', async (req, res) => {
    const historyData = await History.findByPk(req.params.id);

    res.render('history/edit-history', {
        history: historyData,
    });
});

router.post('/history/update', async (req, res) => {
    await History.update({
        GameId: req.body.gameId,
        playedAt: Date.now(),
        score: req.body.score,
    }, {
        where: {
            id: +req.body.id,
        },
    });

    res.redirect('/histories');
});

router.get('/history/delete/:id', async (req, res) => {
    await History.destroy({
        where: {
            id: req.params.id,
        }
    })

    res.redirect('/histories');
});

module.exports = router;