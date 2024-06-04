const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    // find all tasks where user id and completed is 0
    const tasks = await Task.findAll({ where: { userId: req.user.id, completed: false } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

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

const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByPk(req.params.id);

    if (task && task.userId === req.user.id) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.completed = completed !== undefined ? completed : task.completed;

      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

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
