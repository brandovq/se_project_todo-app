import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); --> This was removed but kept here just for reference. It was selected through the getView method in the todo.js file instead.
const todosList = document.querySelector(".todos__list");

// The logic in this function should all be handled in the Todo class.
//****IMPORTANT NOTE****: Remember that when working outside a class, you call the method by referencing the name of the instance (ex. todo) and you would call the method, ex. --> todo.getView(). Inside the class, for example when you call it, you reference the this._ object by writing this._ first then the name of the method your calling.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

//below is what called instantiation, in this case its done on the Section class
const section = new Section({
  items: initialTodos, //pass initial todos as an array to items key
  renderer: (item) => {
    const todo = generateTodo(item); //generate todo item
    section.addItem(todo); // Use addItem method from Section class to add the new todo
  },
  containerSelector: ".todos__list",
});

section.renderItems(); //call section instance's renderItems method

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// New reusable function to render and append a todo
const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Created a date object and adjusted for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo); // Use addItem method from Section class to add the new todo

  // Resets form fields and validation state
  newTodoValidator.resetValidation();

  closeModal(addTodoPopup);
});

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
