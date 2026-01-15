class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._completed = data.completed;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    //Assigned checkbox completed status on the code line above
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    //As for the two lines above its just a matter of moving the code over from index.js and figuring out what little details need to be adjusted. Like on todoCheckboxEl I had to add this._ to both data.id in the template literal.
  }
  //IMPORTANT NOTE: After I added the event listener when I logged it to the console it cam eout undefined. I had to just remove the const part from todoCheckboxEl and todoLabel then just added a this._

  _generateDueDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate.getTime())) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _setEventListener() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      const isCompleted = this._todoCheckboxEl.checked;
      this._completed = isCompleted;
      this._data.completed = isCompleted;
      this._handleCheck(isCompleted);
      // Old code below:
      // this._handleCheck(this._completed);
      // this._data.completed = !this._data.completed;
    });
  }

  getView() {
    this._todoElement = this._templateElement.content //To use the template element outside of the function here, I had to remove const and add this._todoElement. The todoElement part was already there before. I added this._ to all of them.
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    //****IMPORTANT NOTE BELOW****: Remember that when working outside a class, you call the method by referencing the name of the instance (ex. todo) and you would call the method, ex. --> todo.getView(). Inside the class, for example when you call it, you reference the this._ object by writing this._ first then the name of the method your calling.
    //****ALSO, since both methods, _generateCheckboxEl and _setEventListener() are private, in order access them inside other methods like in the public getview() method, I had to remove the const before the variable name and replaced it with this._ --> ex. for this._todoDeleteBtn. I had to do that inside the event listener so to access it outside I added this._ to the variable name too inside the getView() method.
    this._generateCheckboxEl();
    this._generateDueDateEl();
    this._setEventListener();

    return this._todoElement;
  }
}

export default Todo;
