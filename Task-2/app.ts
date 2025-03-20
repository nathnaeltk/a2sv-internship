// Define the type for a task
interface Task {
    text: string;
    completed: boolean;
  }
  
  // Get DOM elements
  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const taskList = document.getElementById('taskList') as HTMLUListElement;
  
  // Load tasks from localStorage (ensuring it's an array of tasks)
  let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  
  // Render tasks
  function renderTasks(): void {
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
  function addTask(): void {
      const text = taskInput.value.trim();
      if (text) {
          tasks.push({ text, completed: false });
          taskInput.value = '';
          renderTasks();
      }
  }
  
  // Delete task
  function deleteTask(index: number): void {
      tasks.splice(index, 1);
      renderTasks();
  }
  
  // Toggle task completion
  function toggleTask(index: number): void {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
  }
  
  // Save tasks to localStorage
  function saveTasks(): void {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
          addTask();
      }
  });
  
  // Initial render
  renderTasks();
  