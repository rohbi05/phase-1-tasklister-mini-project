document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTaskDescription = document.getElementById('new-task-description').value;
    const priority = document.getElementById('priority').value;
    const taskItem = createTaskItem(newTaskDescription, priority);
    taskList.appendChild(taskItem);
    sortTasks();
    taskForm.reset();
  });

  function createTaskItem(description, priority) {
    const taskItem = document.createElement('li');
    taskItem.textContent = description;
    taskItem.dataset.priority = priority;

    if (priority === 'high') {
      taskItem.style.color = 'red';
    } else if (priority === 'medium') {
      taskItem.style.color = 'orange';
    } else if (priority === 'low') {
      taskItem.style.color = 'green';
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(taskItem);
    });

    taskItem.appendChild(deleteButton);
    return taskItem;
  }

  function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
    });

    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
  }
