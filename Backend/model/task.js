const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({ name: String, userId: String });

const Task = mongoose.model('Task', tasksSchema);

exports.Task = Task;