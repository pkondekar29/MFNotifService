const express = require('express');
const userController = require("../controllers/userController");

const router = express.Router();

// base URL
router.get('/', (req, res) => { return res.send('Api working!'); });

// Get all users
router.get('/users', async (req, res) => {
    users = await userController.getAll();
    res.send(users);
});

// Get user by UserId
router.get('/user/:userId', async (req, res) => {
    user = await userController.findIyId(req.params.userId);
    res.send(user);
});

// Create user
router.post('/user', async (req, res) => {
    user = await userController.create(req.body);
    res.status(201).send(user);
});

// Update an user
router.put('/user/:userId', async (req, res) => {
    user = await userController.update(req.params.userId, req.body);
    res.status(204).send(user);
});

module.exports = router;