const express = require('express');
const userController = require("../controllers/userController");

const router = express.Router();

// base URL
router.get('/', (req, res) => { return res.send('Api working!'); });

router.get('/users', (req, res) => {
    res.send(userController.getAll());
});

router.get('/user/:userId', (req, res) => {
    res.send(userController.get(req.params.userId));
});

router.post('/user', (req, res) => {
    res.send(userController.create(req.body));
});

router.put('/user/:userId', (req, res) => {
    res.send(userController.update(req.params.userId, req.body));
});

module.exports = router;