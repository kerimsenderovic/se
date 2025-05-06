const TaskModel = require('../models/taskModel');
const TaskFactory = require('../factories/taskFactory');



exports.getAllTasks = (req, res) => {
    TaskModel.getAll((err, tasks) => {
        if (err) return res.status(500).json({ error: err });
        res.json(tasks);
    });
};

exports.getTaskById = (req, res) => {
    TaskModel.getById(req.params.id, (err, task) => {
        if (err) return res.status(500).json({ error: err });
        res.json(task[0]);
    });
};

exports.createTask = (req, res) => {
    const { type = 'normal', title, description, status } = req.body; 
    const task = TaskFactory(type, title, description);

    
    TaskModel.create({ ...task, status }, (err, result) => {  
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Task created', id: result.insertId });
    });
};
exports.updateTask = (req, res) => {
    const task = req.body;
    TaskModel.update(req.params.id, task, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Task updated' });
    });
};

exports.deleteTask = (req, res) => {
    TaskModel.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Task deleted' });
    });
};