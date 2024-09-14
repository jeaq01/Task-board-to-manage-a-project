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
const now = dayjs();
const dueDate = dayjs(task.dueDate);
const isToday = dueDate.isSame(now, 'day');
const isOverdue = dueDate.isBefore(now, 'day');
let cardColor; 
let textCardColor;
if (isToday){
   cardColor = '#f6c133';
   textCardColor = '#ffffff'
} else if (isOverdue){
  cardColor = "#ce4247";
  textCardColor = '#ffffff'
} else{
  cardColor = '#ffffff';
  textCardColor = '#000000';
};





//this is how is done using vanilla javascript  const todoColumn= document.getElementById('todo-cards'),
const todoColumn= $('#todo-cards');
todoColumn.append(
  `<div class= "draggable ui-draggable" style="background-color: ${cardColor}; border-radius:5px; padding: 10px; margin-bottom: 5px;" id="${task.id}">
   <h5 style="color: ${textCardColor}">${task.title}</h5>
   <p style="color: ${textCardColor}">${task.description}</p>
   <p style="color: ${textCardColor}"> ${task.dueDate}</p>
   <button onclick = "handleDeleteTask(event)"class="btn btn-danger">Delete</button>
  </div>`
);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault()
  const titleElement = $("#title");
  const descriptionElement = $("#description");
  const dueDateElement = $("#dueDate");
  const task = {
    id: generateTaskId(),
    title: titleElement.val(),
    description: descriptionElement.val(),
    dueDate: dueDateElement.val(),
  };
  createTaskCard(task);

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const cardElement = $(event.target).closest('div')
  console.log(cardElement.attr('id'));
  cardElement.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  $('#todo-cards').draggable()
    event.preventDefault()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () { 
    $("#taskForm").on("submit",handleAddTask)
    // $('.draggable').draggable({
    //   opacity: 0.7,
    //   zIndex: 100,
    //   helper: function(e){
    //     const original = $(e.target).hasClass('ui-draggable') 
    //     ? $(e.target)
    //     : $(e.target).closest('ui-draggable');
    //     return original.clone().css({
    //       width: original.outerWidth(),
    //     })
    //   }
    // })
});
