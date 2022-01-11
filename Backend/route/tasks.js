const { Task } = require('../model/task');
const express = require('express');
const router = express.Router();

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

router.post('/tasks', async (req, res) => {
    const task = new Task({ name: req.body.name, userId: req.body.userId });

    const result = await task.save();
    res.send(result);
});

router.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return;
    task.name = req.body.name;
    const result = await task.save();
    res.send(result);
});

router.delete('/tasks/:id', async (req, res) => {
    const result = await Task.findByIdAndDelete(req.params.id);
    res.send(result);
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send(task);
});

module.exports = router;