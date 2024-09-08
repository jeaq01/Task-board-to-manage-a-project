// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [   ]
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = Date.now(); // Current time in milliseconds
    const randomNum = Math.floor(Math.random() * 10000); // Random 4-digit number
    return `${timestamp} ${randomNum}`;
  }
  
  // Example usage
  console.log(generateTaskId());
// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault()
  const titleEl = $("#title");
  const descriptionEl = $("#description");
  const dueDateEl = $("#dueDate");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () { 
    $("#taskForm").on("submit",handleAddTask)
});
