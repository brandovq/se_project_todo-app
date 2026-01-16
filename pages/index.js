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
// const todoTemplate = document.querySelector("#todo-template"); --> This was removed but kept here just for reference. It was selected through the getView method in the todo.js file instead.

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

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // Generate a unique id
    const id = uuidv4();

    // Format the date and adjust for timezone
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // Create the values object with all required fields
    const values = {
      id,
      name: inputValues.name,
      date,
      completed: false, // New todos are not completed by default
    };

    //Move code from existing submission handler to here (below)
    // Passed the values object to generateTodo
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true); // <-- Added this line to update total count when a new todo is added
    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

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

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
