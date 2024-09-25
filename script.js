"use strict";

let tasks = [];
let newTaskObject = {};

const addTask = document.querySelector(".add-task");
const form = document.querySelector(".add-task-form");
const addInput = document.querySelector(".add-task-input");
const listTasks = document.querySelector(".list");
const deleteLast = document.querySelector(".delete-last");
const curDateEl = document.querySelector(".cur-date");
const casualQuestionEl = document.querySelector(".casual-question");
const toast = document.querySelector(".alert-custom");
const closeToastButton = document.querySelector(".alert-custom-close");
const overlay = document.querySelector(".overlay");
const clearList = document.querySelector(".clear-list");

// create a function that takes the user's input and adds it to the tasks array

const addNewTaskToArray = function (task) {
  newTaskObject = {
    taskName: task,
    completed: false,
    taskId: Number(
      Math.floor(Math.random() * 1000000)
        .toString()
        .slice(-3)
    ),
  };
  tasks.push(newTaskObject);
  // writing the array in the local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const deleteLastTask = function () {
  tasks.pop();
  renderTasks();
};

// render the tasks on the page
const renderTasks = function () {
  listTasks.innerHTML = "";
  tasks.forEach((task) =>
    listTasks.insertAdjacentHTML(
      "beforeend",
      `<li class=${task.completed ? "completed" : "to-be-done"}>
      <span data-id="${task.taskId}">${task.taskName}</span>
      <div class="functionality">
      <button data-id="${task.taskId}" class="delete">Delete</button>
      <button data-id="${task.taskId}" class="mark-completed" ${
        task.completed ? "disabled" : ""
      }>Mark as completed</button>
      <button data-id="${task.taskId}" class="unmark ${
        task.completed ? "" : "display-none"
      }">Unmark</button>
      </div>
      </li>`
    )
  );
  // clean the input
  addInput.value = "";
};

renderTasks();

// const renderTasks2 = function (arr) {
//   listTasks.innerHTML = "";
//   arr.forEach((obj) => {
//     listTasks.insertAdjacentHTML(
//       "beforeend",
//       `<li>
//       <span data-id="${obj.taskId}">${obj.taskName}</span>
//       <button data-id="${obj.taskId}" class="delete">Delete</button>
//       <button data-id="${obj.taskId}" class="delete">Delete</button>
//       </li>`
//     );
//   });

//   // clean the input
//   addInput.value = "";
// };

// TO DO: Create a toast that display a congratulating message every time a task is completed: done
// TO DO: make the toast automatically go away in 3 seconds: done
const openToast = function () {
  toast.classList.remove("display-none");
  overlay.classList.remove("display-none");
};

const closeToast = function () {
  toast.classList.add("display-none");
  overlay.classList.add("display-none");
};

const openCloseToastAuto = function () {
  openToast();
  setTimeout(function () {
    closeToast();
  }, 3000);
};

closeToastButton.addEventListener("click", closeToast);

// function to remove an individual task

document.querySelector(".list").addEventListener("click", function (e) {
  // removing individual tasks
  if (e.target.classList.contains("delete")) {
    const itemToRemove = Number(e.target.dataset.id);
    const index = tasks.findIndex((obj) => obj.taskId === itemToRemove);
    tasks.splice(index, 1);
    // re-writing the "tasks" in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
  // marking tasks as completed
  if (e.target.classList.contains("mark-completed")) {
    // display a congratulations message
    openCloseToastAuto();

    const toRemove = Number(e.target.dataset.id);
    // find the index of the task that was marked as completed
    const index = tasks.findIndex((obj) => obj.taskId === toRemove);
    tasks[index].completed = true;

    renderTasks();
    // update completed tasks in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // unmark functionality
  if (e.target.classList.contains("unmark")) {
    const toUnmark = Number(e.target.dataset.id);

    // get the index of the task to unmark
    const index = tasks.findIndex((obj) => obj.taskId === toUnmark);
    tasks[index].completed = false;
    renderTasks();

    // update the tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // make sure to close the toast
    closeToast();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addNewTaskToArray(addInput.value);
  form.classList.add("display-none");
  form.classList.contains("display-none")
    ? (addTask.textContent = "Add new task!")
    : (addTask.textContent = "Cancel");
  renderTasks();
});

addTask.addEventListener("click", function () {
  form.classList.toggle("display-none");
  if (!form.classList.contains("display-none")) addTask.textContent = "Cancel";
  else if (form.classList.contains("display-none"))
    addTask.textContent = "Add new task!";
});

deleteLast.addEventListener("click", deleteLastTask);

// TO DO: Store the tasks in the localStorage: done
window.addEventListener("load", function () {
  const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(retrievedTasks);
  tasks = retrievedTasks;
  renderTasks();
});
// TO DO: Add the ability to mark the task as completed: done
// TO DO: After a task is marked as completed, make the corresponding button disabled: done
// TO DO: have an option to unmark a task: done
// TO DO: Make the form appear dynamically: done
// TO DO: Button to clear the list

clearList.addEventListener("click", function () {
  tasks = [];
  // hide the form
  // form.classList.add("display-none");
  //
  renderTasks();
});

// TO DO: Display the current day: done
// Wednesday, 25th of September 2024
const getCurrentDate = function () {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  const monthOfYear = currentDate.getMonth();
  const fullYear = currentDate.getFullYear();

  return `Today is ${daysOfWeek[dayOfWeek]}, ${dayOfMonth}${
    dayOfMonth >= 4 ? "th" : ""
  } of ${monthsOfYear[monthOfYear]} ${fullYear}`;
};

const initApp = function () {
  curDateEl.textContent = getCurrentDate();
  casualQuestionEl.textContent = "What are your plans for today?";
};

initApp();

// TO DO: add a button to mark the day as completed and when clicked, have the day displayed in a sidebar on the left and when I click on that specific date, have all the corresponding tasks displayed ---> we would need to create a new array of "days" which will store every day as an object
// TO DO: Display fireworks every time a task is completed
