const newTodoInput = document.getElementById("newTodo");
const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const totalTodos = document.getElementById("totalTodos");

// Initialize todo
let todosCount = 0;

//update the total todos count
const updateTotalTodos = () => totalTodos.textContent = `Total Todos: ${todosCount}`;

// line through effect when click checkbox
const toggleStrikethrough = (event) => {
    const checkbox = event.target;

    if (checkbox.checked) {
        checkbox.nextElementSibling.style.textDecoration = "line-through";
    } else {
        checkbox.nextElementSibling.style.textDecoration = "none";
    }
}

// add a new todo
const addTodo = (event) => {
    event.preventDefault();
    const newTodoText = newTodoInput.value;
    if (newTodoText.trim() !== "") {
        const newTodoItem = document.createElement("li");
        newTodoItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${newTodoText}</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        todoList.appendChild(newTodoItem);
        newTodoInput.value = "";
        todosCount++;
        updateTotalTodos();

        // click event listener to the Edit button 
        const editButton = newTodoItem.querySelector(".edit-button");
        editButton.addEventListener("click", editTodo);

        // click event listener to the Delete button f
        const deleteButton = newTodoItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", deleteTodo);
    }
}

// EDIT a todo
const editTodo = (event) => {
    const todoItem = event.target.parentElement;
    const taskDescription = todoItem.querySelector("span");

    //  enter Edit TODO description
    const newTaskDescription = prompt("Edit task description:", taskDescription.textContent);

    // Update TODO if the user entered a value
    if (newTaskDescription !== null) {
        taskDescription.textContent = newTaskDescription;
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
