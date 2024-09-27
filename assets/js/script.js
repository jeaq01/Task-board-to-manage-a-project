// Retrieve tasks and nextId from localStorage
let taskList = [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
let drake;

function storeTaskInLocalStorage(task){
  if(task){
    taskList.push(task);
  }
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = Date.now(); // Current time in milliseconds    
    const randomNum = Math.floor(Math.random() * 10000); // Random 4-digit number
    return `${timestamp}_${randomNum}`;
}

function getCardColors(taskDueDate){
  var now = dayjs();
  var dueDate = dayjs(taskDueDate);
  var isToday = dueDate.isSame(now, 'day');
  var isOverdue = dueDate.isBefore(now, 'day');//Comparing dates, checking if the due date is before the current date
  var cardColor;
  var textCardColor;
  if(isToday){
    cardColor = '#f6c133';//If the due date is the same as today, we paint in yellow
    textCardColor = '#ffffff';
  }else if(isOverdue){
    cardColor = '#ce4247';//If the due date is in the past, we paint in red
    textCardColor = '#ffffff';
  }else{
    cardColor = '#ffffff';//If the due date is not in the past and equal to the current date, we paint white
    textCardColor = '#000000';
  }
  return {
    backgroundColor: cardColor,
    textColor: textCardColor,
  };
}

// Todo: create a function to create a task card
function createTaskCard(task) { 
  let cardColors = getCardColors(task.dueDate);
  var cardColor = cardColors.backgroundColor;
  textCardColor = cardColors.textColor;
  var column;
  switch (task.status) {
    case 'todo':
      column = $('#todo-cards-body');
      break;
    case 'inprogress':
      column = $('#in-progress-column-body');
      break;
    case 'done':
      column = $('#done-cards-column-body');
      cardColor = '#ffffff';
      textCardColor = '#000000';
      break;  
    default:
      column = $('#todo-cards-body');
      break;
  }

  column.append(
    `<div class="task-card text-center" style="background-color: ${cardColor}; border-radius: 5px; padding: 10px; margin-bottom: 5px;" id="${task.id}">      
      <h5 class="card-text" style="color: ${textCardColor}">${task.title}</h5>
      <p class="card-text" style="color: ${textCardColor}">${task.description}</p>
      <p class="card-text due-date-label" style="color: ${textCardColor}">${task.dueDate}</p> 
      <button onClick="handleDeleteTask(event)" class="btn btn-danger">Delete</button>
    </div>
    `
  );
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  taskList.forEach(task => {
    createTaskCard(task)
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault()
  const titleElement = $("#title");
  const descriptionElement = $("#description");
  const dueDateElement = $("#dueDate");
  let task = {
    id: generateTaskId(),
    title: titleElement.val(),
    description: descriptionElement.val(),
    dueDate: dueDateElement.val(),
    status: 'todo',//todo, inprogress, done
  };
  createTaskCard(task);
  storeTaskInLocalStorage(task);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const cardElement = $(event.target).closest('div');
    cardElement.remove();
    taskList = taskList.filter(task => task.id == cardElement.attr('id'));
    storeTaskInLocalStorage();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(el) {
    //I need to find out the id of the container where this element was dropped
    let containerId = el.closest('.drag-container').getAttribute('id');
    //Getting the index of the task with the given droped card ID in the list of tasks
    let taskIndex = taskList.findIndex(task => task.id == el.getAttribute('id'));
    //If the element was dropped inside the done column, Im going to change the background to white
    if(containerId == 'done-cards-column-body'){
      el.style.backgroundColor = '#ffffff';
      $(`#${el.getAttribute('id')} > .card-text`).each(function (index, element){
        element.style.color = "#000000";
      });
      //update the status of the task with this id
      if(taskIndex != -1){
        taskList[taskIndex].status = 'done';
      }
    }else{
      //Get the due date from the due date element
      var dueDate = $(`#${el.getAttribute('id')} > .due-date-label`).first().text();        
      el.style.backgroundColor = getCardColors(dueDate).backgroundColor;
      //Get all the card text elements
      $(`#${el.getAttribute('id')} > .card-text`).each(function (index, element){
        element.style.color = getCardColors(dueDate).textColor;
      });
      if(containerId == 'in-progress-column-body'){
        if(taskIndex != -1){
          taskList[taskIndex].status = 'inprogress';
        }
      }else{
        if(taskIndex != -1){
          taskList[taskIndex].status = 'todo';
        }
      }
    }
    storeTaskInLocalStorage();
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () { 
    taskList = JSON.parse(localStorage.getItem("tasks")?? '[]');
    renderTaskList();
    $("#taskForm").on("submit",handleAddTask)
    drake = dragula([document.querySelector('#todo-cards-body'), document.querySelector('#in-progress-column-body'), document.querySelector('#done-cards-column-body')]);
    drake.on('drop', function(el){            
      handleDrop(el);
    });
});
