const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (title === '' || description === '') return;

  addTask(title, description);

  taskForm.reset();
});

function addTask(title, description) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');

  const taskTitle = document.createElement('h3');
  taskTitle.textContent = title;

  const taskDesc = document.createElement('p');
  taskDesc.textContent = description;

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttons');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Mark as Completed';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';

  // Mark as Completed / Incomplete
  completeBtn.addEventListener('click', () => {
    taskDiv.classList.toggle('completed');
    completeBtn.textContent = taskDiv.classList.contains('completed')
      ? 'Mark as Incomplete'
      : 'Mark as Completed';
  });

  // Delete Task
  deleteBtn.addEventListener('click', () => {
    taskDiv.remove();
  });

  // Edit Task
  editBtn.addEventListener('click', () => {
    if (editBtn.textContent === 'Edit') {
      // Switch to edit mode
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = taskTitle.textContent;

      const descInput = document.createElement('textarea');
      descInput.value = taskDesc.textContent;

      taskDiv.replaceChild(titleInput, taskTitle);
      taskDiv.replaceChild(descInput, taskDesc);

      editBtn.textContent = 'Save';
    } else {
      // Save updated data
      const newTitle = taskDiv.querySelector('input').value;
      const newDesc = taskDiv.querySelector('textarea').value;

      const updatedTitle = document.createElement('h3');
      updatedTitle.textContent = newTitle;

      const updatedDesc = document.createElement('p');
      updatedDesc.textContent = newDesc;

      taskDiv.replaceChild(updatedTitle, taskDiv.querySelector('input'));
      taskDiv.replaceChild(updatedDesc, taskDiv.querySelector('textarea'));

      editBtn.textContent = 'Edit';
    }
  });

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  taskDiv.appendChild(taskTitle);
  taskDiv.appendChild(taskDesc);
  taskDiv.appendChild(buttonContainer);

  taskList.appendChild(taskDiv);
}
