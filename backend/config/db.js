// Import modules
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables for database connection
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
  }
);

// Test connection to the database
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Export sequelize for use elsewhere
module.exports = sequelize;
