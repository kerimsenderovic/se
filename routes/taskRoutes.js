const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');



router.get('/', taskController.getAllTasks);          // Will become /api/tasks
router.get('/:id', taskController.getTaskById);      // Will become /api/tasks/:id
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);


module.exports = router;
