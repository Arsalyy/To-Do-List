const mongoose = require('mongoose');
const tasks = require('./route/tasks');
const users = require('./route/users');
const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/todo')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api', tasks);
app.use('/api', users);

const server = app.listen(3000, () => console.log('Listenng on Port 3000...'));

module.exports = server;