const newTodoInput = document.getElementById("new-todo");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const totalTodos = document.getElementById("total-todos");

// Initialize todo
let todosCount = 0;

// Update the total todos count
const updateTotalTodos = () => totalTodos.textContent = `Total Todos: ${todosCount}`;

// Line-through effect when click checkbox
const toggleStrikethrough = (event) => {
    const checkbox = event.target;

    if (checkbox.checked) {
        checkbox.nextElementSibling.style.textDecoration = "line-through";
    } else {
        checkbox.nextElementSibling.style.textDecoration = "none";
    }
}

// Add a new todo
const addTodo = (event) => {
    event.preventDefault();
     const newTodoText = newTodoInput.value;

    if (!newTodoText.trim()) {
         throw alert("Please enter the task");
    } else {
        // create elements
        const newTodoItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        // attributes and content
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        span.textContent = newTodoText;
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // append elements to the newTodoItem
        newTodoItem.appendChild(checkbox);
        newTodoItem.appendChild(span);
        newTodoItem.appendChild(editButton);
        newTodoItem.appendChild(deleteButton);

        // append newTodoItem to todoList
        todoList.appendChild(newTodoItem);

        // clear input field and update count
        newTodoInput.value = "";
        todosCount++;
        updateTotalTodos();

        // Click event listener for the Edit button
        editButton.addEventListener("click", editTodo);

        // Click event listener for the Delete button
        deleteButton.addEventListener("click", deleteTodo);
    }
}

// Edit a todo
const editTodo = (event) => {
    const todoItem = event.target.parentElement;
    const taskDescription = todoItem.querySelector("span");

    // Enter Edit TODO description
    const newTaskDescription = prompt("Edit task description:", taskDescription.textContent);

    // Update TODO if the user entered a value
    if (newTaskDescription) {
        taskDescription.textContent = newTaskDescription;
    } else {
       throw alert("Please enter a valid task description.");
    }
}

// delete a todo
const deleteTodo = (event) => {
    const todoItem = event.target.parentElement;
    todoItem.remove();
    todosCount--;
    updateTotalTodos();
}


todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("change", (event) => {
    if (event.target.classList.contains("checkbox")) {
        toggleStrikethrough(event);
    }
});
