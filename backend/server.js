const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/User');
const Task = require('./models/Task');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error: ' + err);
});
