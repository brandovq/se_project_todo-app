import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); --> This was removed but kept here just for reference. It was selected through the getView method in the todo.js file instead.
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text"); // Here I instantiated the TodoCounter class, passing in the initialTodos array and the selector for the counter text element. REMEMBER that the .counter__text should match the one used in the HTML file

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    //Move code from existing submission handler to here (below)
    const todo = generateTodo(inputValues);
    section.addItem(todo);
    addTodoPopup.close();
    addTodoForm.reset();
  },
});
addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
//****IMPORTANT NOTE****: Remember that when working outside a class, you call the method by referencing the name of the instance (ex. todo) and you would call the method, ex. --> todo.getView(). Inside the class, for example when you call it, you reference the this._ object by writing this._ first then the name of the method your calling.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();

  return todoElement;
};

//Below is what called instantiation, in this case its done on the Section class
const section = new Section({
  items: initialTodos, //passed initial todos as an array to items key
  renderer: (item) => {
    const todo = generateTodo(item); //generate todo item
    section.addItem(todo); // Used addItem method from Section class to add the new todo
  },
  containerSelector: ".todos__list",
});

section.renderItems(); //called section instance's renderItems method

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// New reusable function to render and append a todo
const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

//Find the currently opened modal and close it below:
function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    closeModal(openPopup);
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//Below is old code,replaced by the addTodoPopup
// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Created a date object and adjusted for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();

//   const values = { name, date, id };
//   const todo = generateTodo(values);
//   section.addItem(todo); // Use addItem method from Section class to add the new todo

//   // Resets form fields and validation state
//   newTodoValidator.resetValidation();

// // Rendered initial todos using the renderTodo function. Commented out below bc now done through Section class. You can't have this old code present or else the new code can be broken
// initialTodos.forEach((item) => {
//   renderTodo(item);
// });
// Use addItem method from Section class instead of this old code. Changed to new code below:

// initialTodos.forEach((item) => {
//   section.addItem(generateTodo(item));
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
