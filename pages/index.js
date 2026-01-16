import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todoCounter = new TodoCounter(initialTodos, ".counter__text"); // Here I instantiated the TodoCounter class, passing in the initialTodos array and the selector for the counter text element. REMEMBER that the .counter__text should match the one used in the HTML file

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false); // Decrement completed count if the deleted todo was completed
  }
  todoCounter.updateTotal(false); // Always decrement total count when a todo is deleted
}

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // Added id directly to inputValues
    inputValues.id = uuidv4();

    // Formatted the date and adjust for timezone
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    inputValues.date = date;

    // Set completed to false
    inputValues.completed = false;

    //Generate and add the todo:
    renderTodo(inputValues);
    todoCounter.updateTotal(true); // <-- Added this line to update total count when a new todo is added
    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

// Here you get the form from the popup instance:
const addTodoForm = addTodoPopup.getForm();

// The logic in this function should all be handled in the Todo class.
//****IMPORTANT NOTE****: Remember that when working outside a class, you call the method by referencing the name of the instance (ex. todo) and you would call the method, ex. --> todo.getView(). Inside the class, for example when you call it, you reference the this._ object by writing this._ first then the name of the method your calling.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

//Below is what called instantiation, in this case its done on the Section class
const section = new Section({
  items: initialTodos, //passed initial todos as an array to items key
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems(); //called section instance's renderItems method

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
