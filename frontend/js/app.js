// main javascript file for frontend manipulation

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const taskSection = document.getElementById('task-section');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
  
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const quoteSection = document.getElementById('quote-section');
    const quoteElement = document.getElementById('quote');
    const newQuoteButton = document.getElementById('new-quote');
  
    const notification = document.getElementById('notification');
  
    const apiUrl = 'http://localhost:5000/api';
    const quotesApiUrl = 'https://api.quotable.io/random';
  
    const showNotification = (message, type) => {
      notification.textContent = message;
      notification.className = `notification ${type}`;
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
    };
  
    const showSection = (section) => {
      loginSection.style.display = 'none';
      registerSection.style.display = 'none';
      taskSection.style.display = 'none';
      section.style.display = 'block';
    };
  
    const updateNavLinks = () => {
      const token = localStorage.getItem('token');
      if (token) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
        quoteSection.style.display = 'block';
      } else {
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
        quoteSection.style.display = 'none';
      }
    };
  
    const getTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${apiUrl}/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
  
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span class="task-details">
              <span class="task-title">${task.title}</span>
              <span class="task-description">${task.description}</span>
            </span>
            <span class="task-buttons">
              <button>✔</button>
              <button>✘</button>
            </span>
          `;
          const doneButton = li.querySelector('button:first-of-type');
          const deleteButton = li.querySelector('button:last-of-type'); 
          doneButton.addEventListener('click', () => markTaskDone(task.id));
          deleteButton.addEventListener('click', () => deleteTask(task.id));
          taskList.appendChild(li);
        });
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const addTask = async (e) => {
      e.preventDefault();
      const title = document.getElementById('task-title').value;
      const description = document.getElementById('task-description').value;
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch(`${apiUrl}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title, description })
        });
  
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
  
        const task = await response.json();
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="task-details">
          <span class="task-title">${task.title}</span>
          <span class="task-description">${task.description}</span>
        </span>
        <span class="task-buttons">
          <button>✔</button>
          <button>✘</button>
        </span>
        `;
        const doneButton = li.querySelector('button:first-of-type'); 
        const deleteButton = li.querySelector('button:last-of-type');
        doneButton.addEventListener('click', () => markTaskDone(task.id));
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        taskList.appendChild(li);
  
        taskForm.reset();
        showNotification('Task added successfully', 'success');
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const markTaskDone = async (id) => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${apiUrl}/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ completed: true })
        });
  
        if (!response.ok) {
          throw new Error('Failed to mark task as done');
        }
  
        showNotification('Task marked as done', 'success');
        getTasks();
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const deleteTask = async (id) => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${apiUrl}/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
  
        showNotification('Task deleted successfully', 'success');
        getTasks();
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const fetchQuote = async () => {
      try {
        const response = await fetch(quotesApiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }
        const data = await response.json();
        const quote = "\"" + data.content + "\"" + " - " + data.author;
        quoteElement.textContent = quote;
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const login = async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      try {
        const response = await fetch(`${apiUrl}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (!response.ok) {
          throw new Error('Invalid email or password');
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
        showSection(taskSection);
        updateNavLinks();
        getTasks();
        fetchQuote();
        showNotification('Login successful', 'success');
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const register = async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
  
      try {
        const response = await fetch(`${apiUrl}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
  
        if (!response.ok) {
          throw new Error('Registration failed, user already exists');
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
        showSection(taskSection);
        updateNavLinks();
        getTasks();
        fetchQuote();
        showNotification('Registration successful', 'success');
      } catch (error) {
        showNotification(error.message, 'error');
      }
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      showSection(loginSection);
      updateNavLinks();
      showNotification('Logged out successfully', 'success');
    };
  
    loginLink.addEventListener('click', () => showSection(loginSection));
    registerLink.addEventListener('click', () => showSection(registerSection));
    logoutLink.addEventListener('click', logout);
    newQuoteButton.addEventListener('click', fetchQuote);
  
    loginForm.addEventListener('submit', login);
    registerForm.addEventListener('submit', register);
    taskForm.addEventListener('submit', addTask);
  
    if (localStorage.getItem('token')) {
      showSection(taskSection);
      updateNavLinks();
      getTasks();
      fetchQuote();
    } else {
      showSection(loginSection);
      updateNavLinks();
    }
});
  