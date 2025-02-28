class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  getView() {
    this._todoElement = this._templateElement.content //To use the template element outside of the function here, I had to remove const and add this._todoElement. The todoElement part was already there before. I added this._ to all of them.
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;
    //Assigned checkbox completed status on the code line above

    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
    //As for the two lines above its just a matter of moving the code over from index.js and figuring out what little details need to be adjusted. Like on todoCheckboxEl I had to add this._ to both data.id in the template literal.

    return this._todoElement;
  }
}

export default Todo;
