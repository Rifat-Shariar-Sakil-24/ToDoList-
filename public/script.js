// Fetch tasks from the server and render them
function fetchTasks() {
  fetch('/tasks', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';

      tasks.forEach(task => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.task;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          editTask(task.id, span);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteTask(task.id);
        });

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Add a task
function addTask(task) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ task })
  })
    .then(response => {
      if (response.status === 201) {
        fetchTasks();
      }
    })
    .catch(error => console.error('Error adding task:', error));
}

// Edit a task
function editTask(taskId, taskElement) {
  const taskText = taskElement.textContent;
  const taskWidth = window.getComputedStyle(taskElement).width;

  // Create an input element
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.value = taskText;
  taskInput.style.width = taskWidth;

  // Create a container element
  const container = document.createElement('div');
  container.classList.add('task-container');
  container.appendChild(taskInput);

  // Replace the task element with the container
  taskElement.parentNode.replaceChild(container, taskElement);

  // Set the focus to the input element
  taskInput.focus();

  // Handle input blur event
  taskInput.addEventListener('blur', () => {
    const updatedTask = taskInput.value.trim();
    if (updatedTask !== '') {
      updateTask(taskId, updatedTask);
    } else {
      // Restore the original task text if the input is empty
      taskInput.value = taskText;
    }
    // Replace the container with the original task element
    container.parentNode.replaceChild(taskElement, container);
  });

  // Handle input keydown event
  taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      taskInput.blur();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      taskInput.value = taskText;
      taskInput.blur();
    }
  });
}


// Update a task
function updateTask(taskId, task) {
  fetch(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ task })
  })
    .then(response => {
      if (response.status === 200) {
        fetchTasks();
      }
    })
    .catch(error => console.error('Error updating task:', error));
}

// Delete a task
function deleteTask(taskId) {
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(response => {
      if (response.status === 200) {
        fetchTasks();
      }
    })
    .catch(error => console.error('Error deleting task:', error));
}

// Handle form submission
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();
  if (task !== '') {
    addTask(task);
    taskInput.value = '';
  }
});

// Fetch tasks when the page loads
fetchTasks();
