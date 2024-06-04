// import libraries, controllers and middleware
const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes for tasks (requires authorization)
router
  .route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router
  .route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
