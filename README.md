Getting Started with Taskee
---------------------------------

This guide explains how to set up and run this project, which consists of a backend API and a frontend for user interaction.

## Prerequisites

*   Node.js and npm installed on your system. You can download them from the following link:
    
    *   Node.js: [https://nodejs.org/en](https://nodejs.org/en)
        
    *   npm (comes bundled with Node.js installation)
        
    *   A MySQL database. You can download it from the following link:

        *   MySQL Community Server: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
        

## Backend Setup

```bash
git clone https://github.com/DevFidelis/taskee.git
```
Start by cloning the taskee repository to your localhost.
    
```bash
cd backend 
npm install
``` 
This command will install all the necessary libraries required to run the backend server.
    
## Create a .env file
    
    *   Fill in the required environment variables in the .env file, which include the following:
        * PORT = 500
        * DATABASE_HOST = localhost
        * DATABASE_PORT = your database port
        * DATABASE_USER = root or your set username
        * DATABASE_PASSWORD = your database password
        * DATABASE_NAME = taskee_db
        * JWT_SECRET = your seceret

## Frontend Setup
* use extensions like liveserver to run the frontend 

## Running the Project

```bash
    npm start
``` 
This command will start the backend server on port 5000 (default) by default. You can check the console output for the specific port used.
    
## Documentation

*   This README file provides a basic overview of the setup process.
    
*   More detailed documentation for specific functionalities or API usage is available within the codebase itself through comments or separate documentation files.

This guide should get you up and running with the project. Feel free to explore the codebase further and refer to any additional documentation provided.