// Get DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">
                <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-clock'}" style="color: ${task.completed ? '#4CAF50' : '#FFC107'}"></i>
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(li);
    });
    saveTasks();
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task when Enter key is pressed
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks(); 