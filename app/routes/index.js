const express = require('express');
const {UserController} = require("../controllers/userController");

const router = express.Router();

// base URL
router.get('/', (req, res) => { return res.send('Api working!'); });

// Get all users
router.get('/users', async (req, res) => {
    users = await new UserController().getAll();
    res.send(users);
});

// Get user by UserId
router.get('/user/:userId', async (req, res) => {
    user = await new UserController().findIyId(req.params.userId);
    res.send(user);
});

// Create user
router.post('/user', async (req, res) => {
    user = await new userController().create(req.body);
    res.status(201).send(user);
});

// Update an user
router.patch('/user/:userId', async (req, res) => {
    user = await new UserController().update(req.params.userId, req.body);
    res.status(204).send(user);
});

module.exports = router;