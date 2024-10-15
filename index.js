const todoInput = document.getElementById('todoinput');
const addTodoBtn = document.getElementById('add todo btn');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
let count = 0;

    function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todo-list li span').forEach(task => {
    todos.push(task.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos)); // Store todos as JSON
    }

    // Function to load todos from Local Storage
    function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todoText => addTodo(todoText));
    updateTodoCount(); // Update the counter
    }

    // Add an event listener to the "Add" button
    addTodoBtn.addEventListener('click', function() {
    const todoText = todoInput.value.trim();// Get the value from the input field
    // Check if the input is not empty
    if (todoText !== '') {
    const listItem = document.createElement('li');// Create a new list item (li) element
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';

    const taskText = document.createElement('span');
    taskText.textContent = todoText;
      ++count;
      todoCount.innerHTML = count;
    // Create an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    // Add event listener to the delete button
    deleteBtn.addEventListener('click', function() {
      todoList.removeChild(listItem);
      --count;
      todoCount.innerHTML = count;
       saveTodos();
    });
    
    // Add event listener for editing a task
    editBtn.addEventListener('click', function() {
    // Create an input field with the current task text
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskText.textContent;
    editInput.className = 'edit-input';

    // Create a save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    // Replace the task text with the input field and show the save button
    listItem.replaceChild(editInput, taskText);
    listItem.replaceChild(saveBtn, editBtn);

    // Add event listener for saving the updated task
    saveBtn.addEventListener('click', function() {
    const updatedText = editInput.value.trim();

    if (!updatedText) { // updatedText is not null, empty string , undefined
    taskText.textContent = updatedText;
    // Replace the input field back with the updated task text
    listItem.replaceChild(taskText, editInput);
    listItem.replaceChild(editBtn, saveBtn);
    saveTodos();
    }
    });
    });

    const searchBtn = document.createElement('button');
    searchBtn.textContent = 'search';
    searchBtn.className = 'search-btn';
    const searchInput = document.createElement('input');
    searchInput.type = 'text1';
    searchInput.placeholder = 'Search task';
    searchInput.className = 'search-input';

    searchBtn.addEventListener('click', function(){
    const searchTerm = searchInput.value.trim().toLowerCase(); 
    const todos = document.querySelectorAll('#todo-list li');
    todos.forEach(function (listItem) {
    const taskText = listItem.querySelector('span').textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      listItem.style.display = ''; 
    } else {
      listItem.style.display = 'none';
    }
    });
    });


  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(deleteBtn);
  listItem.appendChild(editBtn);
  todoList.appendChild(listItem);// Add the new list item to the to-do list
  document.body.appendChild(searchInput);
  document.body.appendChild(searchBtn);
    
  // Clear the input field after adding the task
  todoInput.value = '';
  
}
});
loadTodos();