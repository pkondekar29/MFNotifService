const express = require('express');
const userController = require("../controllers/userController");

const router = express.Router();

// base URL
router.get('/', (req, res) => { return res.send('Api working!'); });

router.get('/users', async (req, res) => {
    users = await userController.getAll();
    res.send(users);
});

router.get('/user/:userId', async (req, res) => {
    user = await userController.findIyId(req.params.userId);
    res.send(user);
});

router.post('/user', async (req, res) => {
    user = await userController.create(req.body);
    console.log(user);
    res.send(user);
});

router.put('/user/:userId', async (req, res) => {
    user = await userController.update(req.params.userId, req.body);
    res.status(204);
    res.send(user);
});

module.exports = router;