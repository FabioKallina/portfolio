
const input = document.getElementById("input");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("task-list");
const completedCount = document.getElementById("completed-count");
const toDoCount = document.getElementById("toDoCount");

let completed = 0;
let toDo = 0;

//Update Counts
function updateCounts() {
    completedCount.textContent = completed;
    toDoCount.textContent = toDo;
}

//fetch tasks from the backend
function fetchTasks() {
    fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((tasks) => {
        taskList.innerHTML = "";
        completed = 0;
        toDo = 0;
        tasks.forEach((task) => {
            createTaskElement(task);
            if(task.completed) {
                completed++;
            } else {
                toDo++;
            }
        });
        updateCounts();
    })
    .catch((err) => console.error("Error fetching tasks:", err));
}

//create task element
function createTaskElement(task) {
    const listItem = document.createElement("id");
    listItem.textContent = task.text;

    //Add a complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.style.marginLeft = "10px";
    completeButton.style.padding = "0px";
    completeButton.addEventListener("click", () => toggleTaskCompletion(task, listItem, completeButton));

    //add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.padding = "0px";
    deleteButton.addEventListener("click",() => deleteTask(task._id));

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    if(task.completed) {
        listItem.classList.add("completed");
    }
    taskList.appendChild(listItem);
}

//add task button
addTaskButton.addEventListener("click", () => {
    const text = input.value.trim();
    if(!text) return;

    fetch("http://localhost:3000/tasks",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text })
    })
    .then(() => {
        input.value = "";
        fetchTasks();
    })
    .catch((err) => console.error("Error adding tasks: ", err));
});

//toggle task completion in the backend
function toggleTaskCompletion(task, listItem, completeButton) {
    fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
    })
    .then(() => {
        task.completed = !task.completed;
        listItem.classList.toggle("completed");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        task.completed ? (completed++, toDo--) : (completed--, toDo++);
        updateCounts();
    })
    .catch((err) => console.error("Error updating task: ", err));
}

//Delete task
function deleteTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`,{ method: "DELETE" })
    .then(() => fetchTasks())
    .catch((err) => console.error("Error deleting task: ", err));
}

fetchTasks();