const { User } = require('../model/user');
const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/users', async (req, res) => {
    const user = new User({ name: req.body.name, email: req.body.email, password: req.body.password })
    const result = await user.save();
    res.send(result);
});

module.exports = router;