const TaskModel = require('../models/taskModel');
const TaskFactory = require('../factories/taskFactory');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.getAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { type = 'normal', title, description, status } = req.body;
    const task = TaskFactory(type, title, description);
    const insertId = await TaskModel.create({ ...task, status });
    res.json({ message: 'Task created', id: insertId });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = req.body;
    const affectedRows = await TaskModel.update(req.params.id, task);
    if (affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const affectedRows = await TaskModel.delete(req.params.id);
    if (affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
};
