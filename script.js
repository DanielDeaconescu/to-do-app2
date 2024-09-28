"use strict";

let tasks = [{ taskName: "test", completed: true, taskId: 1234 }];

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

// function that adds the updated array to the local storage

const addToLocalStorage = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addNewTaskToArray = function (task) {
  const newTaskObject = {
    taskName: task,
    completed: false,
    taskId: Number(
      Math.floor(Math.random() * 1000000)
        .toString()
        .slice(-3)
    ),
  };
  tasks.push(newTaskObject);
  addToLocalStorage();

  // render the updated tasks
  renderTasks();
};

const deleteLastTask = function () {
  tasks.pop();
  renderTasks();
};

// render the tasks on the page
// function to clean the input
const cleanInput = () => (addInput.value = "");

const renderTasks = function () {
  listTasks.innerHTML = "";
  tasks.forEach((task) =>
    listTasks.insertAdjacentHTML(
      "beforeend",
      `<li class="task ${task.completed ? "completed" : "not-completed"}">
      <div class="task-name" data-id="${task.taskId}">${task.taskName}</div>
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
};

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
overlay.addEventListener("click", closeToast);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeToast();
});

// function to remove an individual task
document.querySelector(".list").addEventListener("click", function (e) {
  // removing individual tasks
  if (e.target.classList.contains("delete")) {
    const IDofItemToRemove = Number(e.target.dataset.id);
    const indexOfTheItemToRemove = tasks.findIndex(
      (obj) => obj.taskId === IDofItemToRemove
    );
    tasks.splice(indexOfTheItemToRemove, 1);
    addToLocalStorage();
    renderTasks();
  }
  // marking tasks as completed
  if (e.target.classList.contains("mark-completed")) {
    // display a congratulations message
    openCloseToastAuto();

    const IDofItemToMarkCompleted = Number(e.target.dataset.id);
    const indexOfItemToMarkCompleted = tasks.findIndex(
      (obj) => obj.taskId === IDofItemToMarkCompleted
    );
    tasks[indexOfItemToMarkCompleted].completed = true;

    renderTasks();
    addToLocalStorage();
  }

  // unmark functionality
  if (e.target.classList.contains("unmark")) {
    const IDofItemtoUnmark = Number(e.target.dataset.id);
    // get the index of the task to unmark
    const indexOfItemToUnmark = tasks.findIndex(
      (obj) => obj.taskId === IDofItemtoUnmark
    );
    tasks[indexOfItemToUnmark].completed = false;

    renderTasks();
    addToLocalStorage();
  }
});

const closeForm = function () {
  form.classList.add("display-none");
};

const checkIfFormIsDisplayed = function () {
  return !form.classList.contains("display-none") ? true : false;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addNewTaskToArray(addInput.value);
  cleanInput();
  closeForm();
  checkIfFormIsDisplayed()
    ? (addTask.textContent = "Cancel")
    : (addTask.textContent = "Add new task");
});

addTask.addEventListener("click", function () {
  form.classList.toggle("display-none");
  checkIfFormIsDisplayed()
    ? (addTask.textContent = "Cancel")
    : (addTask.textContent = "Add new task");
});

deleteLast.addEventListener("click", deleteLastTask);

// function that retrieves the objects from the local storage
const getFromLocalStorage = function () {
  const retrievedItems = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrievedItems;
  renderTasks();
};

// console.log(getFromLocalStorage());

window.addEventListener("load", getFromLocalStorage);

// TO DO: Store the tasks in the localStorage: done
// window.addEventListener("load", function () {
//   const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
//   console.log(retrievedTasks);
//   tasks = retrievedTasks;
//   renderTasks();
// });
// TO DO: Add the ability to mark the task as completed: done
// TO DO: After a task is marked as completed, make the corresponding button disabled: done
// TO DO: have an option to unmark a task: done
// TO DO: Make the form appear dynamically: done
// TO DO: Button to clear the list

clearList.addEventListener("click", function () {
  tasks = [];
  addToLocalStorage();
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
  tasks = JSON.parse(localStorage.getItem("tasks"));
  addToLocalStorage();
  renderTasks();
  curDateEl.textContent = getCurrentDate();
  casualQuestionEl.textContent = "What are your plans for today?";
};

initApp();

// TO DO: add a button to mark the day as completed and when clicked, have the day displayed in a sidebar on the left and when I click on that specific date, have all the corresponding tasks displayed ---> we would need to create a new array of "days" which will store every day as an object
// TO DO: Display fireworks every time a task is completed
