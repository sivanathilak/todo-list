console.log("JavaScript is connected!");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Get HTML elements
const addButton = document.getElementById("add-button");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


// ========================
// CREATE - Add a new task
// ========================

addButton.addEventListener("click", function () {
    const taskText = todoInput.value.trim();

    // Don't allow empty tasks
    if (taskText === "") {
        return;
    }

    // Create a task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add object to tasks array
    tasks.push(newTask);

    saveTasks();
    displayTasks();

    // Clear input box
    todoInput.value = "";
});


// ========================
// READ - Display all tasks
// ========================

function displayTasks() {
    todoList.innerHTML = "";

    tasks.forEach(function (task) {

        // Create list item
        const listItem = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            toggleTask(task.id);
        });


        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        // Cross out completed tasks
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }


        // Create Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            editTask(task.id, listItem, taskText, editButton);
        });


        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });


        // Put everything inside the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        // Put list item on webpage
        todoList.appendChild(listItem);
    });
}


// ========================
// UPDATE - Complete a task
// ========================

function toggleTask(taskId) {

    const selectedTask = tasks.find(function (task) {
        return task.id === taskId;
    });

    selectedTask.completed = !selectedTask.completed;

    saveTasks();
    displayTasks();
}


// ========================
// UPDATE - Edit a task
// ========================

function editTask(taskId, listItem, taskText, editButton) {

    // Find the task object
    const selectedTask = tasks.find(function (task) {
        return task.id === taskId;
    });

    // Create an input box
    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.value = selectedTask.text;

    // Replace task text with input box
    listItem.replaceChild(editInput, taskText);

    // Change Edit button to Save
    editButton.textContent = "Save";

    // When Save is clicked
    editButton.onclick = function () {

        const newText = editInput.value.trim();

        // Don't allow empty task names
        if (newText === "") {
            return;
        }

        // Update the task
        selectedTask.text = newText;

        saveTasks();
        displayTasks();
    };
}


// ========================
// DELETE - Delete a task
// ========================

function deleteTask(taskId) {

    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    displayTasks();
}


// ========================
// Save tasks
// ========================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display saved tasks when page loads
displayTasks();