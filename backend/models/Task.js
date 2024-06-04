const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Task;
