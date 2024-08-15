
document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');

    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        if (isCompleted) li.classList.add('completed');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.onclick = () => editTask(li, taskText);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = isCompleted ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleTaskCompletion(li, isCompleted);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(li);

        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        return li;
    }

    function addTask(taskText) {
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            pendingTasksList.appendChild(taskElement);
            taskInput.value = '';
        }
    }

    function toggleTaskCompletion(taskElement, isCompleted) {
        if (isCompleted) {
            // Move task to pending list
            pendingTasksList.appendChild(taskElement);
            taskElement.classList.remove('completed');
            taskElement.querySelector('button').textContent = 'Complete';
        } else {
            // Move task to completed list
            completedTasksList.appendChild(taskElement);
            taskElement.classList.add('completed');
            taskElement.querySelector('button').textContent = 'Undo';
        }
    }

    function editTask(taskElement, oldText) {
        const newText = prompt('Edit task:', oldText);
        if (newText !== null && newText.trim() !== '') {
            taskElement.querySelector('span').textContent = newText;
        }
    }

    function deleteTask(taskElement) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskElement.remove();
        }
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });
});
