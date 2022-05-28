'use strict'
//get element by ID from todo page
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

//Create tasks array
const todoArr = [];

//Create class the Task
class Task {
    constructor(task, owner, isDone){
         this.task = task;
         this.owner = owner;
         this.isDone = isDone;
};
}

//Check browser has support localStorage
//Get the user data form localStorage 
let user;

if (typeof(Storage) !== "undefined") {
    const Obj = getFromStorage ("USER");
    if(Obj !== null){
      user = parseUser(Obj);
    }else {
        alert("You need to login to use this page!");//check user login.
        window.location.href = '../pages/login.html';
    }

//Get task list form localStorage
    const taskList = getFromStorage("taskList");
    if(taskList !== null){
        for(const task of taskList){
            if(task.owner === user.userName){
                const taskInstance = new Task(task.task, task.owner, task.isDone);
                todoArr.push(taskInstance);
                renderTaskList(todoArr);
            }
        }
    }else console.log("No Task data in local storage!");
    console.log(localStorage);
}else {console.log("Sorry! No Web Storage support..");}
//check user login


//Add button event, check if the task name inputed or not
btnAdd.addEventListener("click", function(){
    if(inputTask.value !== ""){
    const newTask = new Task(inputTask.value, user.userName, false); 
    todoArr.push(newTask);
    renderTaskList(todoArr);
    saveToStorage("taskList", todoArr);
    console.log(todoArr);
    }else alert("Please, input Task !");
})

//Render tasks list
function renderTaskList(todoArr){
    todoList.innerHTML = "";
    for(const task of todoArr){
        const li = document.createElement("li");
        if(task.isDone){
            li.classList.add("checked");
            li.innerHTML = `${task.task}<span class="close">×</span>`;
        }else li.innerHTML = `${task.task}<span class="close">×</span>`;
        todoList.appendChild(li);
    }
}

//Call function
DeleteAndCheckTask(todoList);

//Delete and check the task is done or not function
function DeleteAndCheckTask(todoList){
    todoList.addEventListener("click", function(e){
        let index

        //Delete the task
        //if click "span" element, select index span element form "li" element
        if(e.target.nodeName == "SPAN"){
            index = Array.from(todoList.children).indexOf(e.target.parentNode);
            if (confirm("Are you sure?")) {
                // deleteTask(index);
                todoArr.splice(index, 1);
                saveToStorage("taskList", todoArr);
                renderTaskList(todoArr);
            }                
        }

        //Check the task is done or not
        //if click "li" element, select index form ul element array
        if(e.target.nodeName == "LI"){
            index = (Array.from(todoList.children).indexOf(e.target));
            if(confirm(`${todoArr[index].task} is done ?`)){
                todoArr[index].isDone = true;
                saveToStorage("taskList", todoArr);
                renderTaskList(todoArr);
            }else {
                todoArr[index].isDone = false;
                saveToStorage("taskList", todoArr);
                renderTaskList(todoArr);
            }
        }
    })
}

//Deleta the task function

// function deleteTask(taskIndex) {
//         todoArr.splice(taskIndex, 1);
//         saveToStorage("taskList", todoArr);
//         renderTaskList(todoArr);
// }



