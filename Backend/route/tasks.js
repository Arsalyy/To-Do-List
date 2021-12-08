const { Task } = require('../model/task');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

router.post('/', async (req, res) => {
    const task = new Task({ name: req.body.name });

    const result = await task.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return;
    task.name = req.body.name;
    const result = await task.save();
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const result = await Task.findByIdAndDelete(req.params.id);
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send(task);
});

module.exports = router;