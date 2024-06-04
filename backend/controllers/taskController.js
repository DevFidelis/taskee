// import models
const Task = require('../models/Task');

// Get all pending tasks for the current user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id, completed: false },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task for the current user
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task for the current user
const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByPk(req.params.id);

    if (task && task.userId === req.user.id) {
      task.update({ title, description, completed });
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task for the current user
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task && task.userId === req.user.id) {
      await task.destroy();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
