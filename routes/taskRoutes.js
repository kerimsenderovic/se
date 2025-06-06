const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');


router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);


module.exports = router;
