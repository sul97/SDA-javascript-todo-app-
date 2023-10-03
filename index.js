const newTodoInput = document.getElementById("new-todo");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const totalTodos = document.getElementById("total-todos");
const CompletedTodos = document.getElementById("complet-todos");
const allTodos = document.getElementById("all-todos");
const activeTodos = document.getElementById("active-todos");
const completedTodos = document.getElementById("completed-todos");

// Initialize todo
let todosCount = 0;
let completedCount = 0;

// Update the total todos count
const updateTotalTodos = () => totalTodos.textContent = `Total Number of Task:${todosCount}`;

// Update the total completed todos
const updateTotalCompleted = () => CompletedTodos.textContent = `Total Number of Compleeted Task: ${completedCount}`;

// Line-through effect when click checkbox
const toggleStrikethrough = (event) => {
    const checkbox = event.target;

    if (checkbox.checked) {
        checkbox.nextElementSibling.style.textDecoration = "line-through";
        completedCount++;
    } else {
        checkbox.nextElementSibling.style.textDecoration = "none";
        completedCount--;
    }
    updateTotalCompleted(); 
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
        
        newTodoItem.style.display = "block";
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

// delete a todo and --completed task if delete
const deleteTodo = (event) => {
    const todoItem = event.target.parentElement;
    const checkbox = todoItem.querySelector(".checkbox");
    if (checkbox.checked) {
        completedCount--; 
    }
    todoItem.remove();
    todosCount--;
    updateTotalCompleted(); 
    updateTotalTodos();
}
// filter a todo items
const filterTodos = (filterType) => {
    const todoItems = todoList.childNodes

    todoItems.forEach((item) => {
        const checkbox = item.querySelector(".checkbox");
        const isCompleted = checkbox.checked;
        let display = false;

        if (filterType === "all") {
            display = true;
        } else if (filterType === "active" && !isCompleted) {
            display = true;
        } else if (filterType === "completed" && isCompleted) {
            display = true;
        }
        item.style.display = display ? "block" : "none";
    });
};

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("change", (event) => {
    if (event.target.classList.contains("checkbox")) {
        toggleStrikethrough(event);
    }
});

allTodos.addEventListener("click", () => filterTodos("all"));
activeTodos.addEventListener("click", () => filterTodos("active"));
completedTodos.addEventListener("click", () => filterTodos("completed"));
