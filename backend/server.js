// import libraries, routes, database configurations and models
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

// Allow CORS (adjust options if needed)
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Define port (default 5000)
const PORT = process.env.PORT || 5000;

// Basic root endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount user and task routes with appropriate paths
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Synchronize database models (create tables if necessary)
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error: ' + err);
});
