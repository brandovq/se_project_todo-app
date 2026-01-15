class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // selected the appropriate element
    this._completed = todos.filter((todo) => todo.completed).length; // Number of completed todos..I went to MDN on help on how to use the filter method. So basically I called the filter method on todos, then I passed the filer method a callback function
    this._total = todos.length; // added the total number of todos aka todos.length
    this._updateText(); // called the method to update the text content
  }

  // Call this when a checkbox is clicked, and when a completed to-do is deleted
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };
  // Explanation of the above code: if increment is true, add 1 to this._completed. Otherwise
  // subtract 1. In either case, call the method to update
  // the text content.

  // Call this below when a to-do is deleted, or when a to-do is
  // created via the form
  updateTotal = (increment) => {
    // if increment is true, add 1 to this._total. Otherwise,subtract 1. In either case, call the method to update the text content.

    this._total += increment ? 1 : -1; //shows total number of todos
    this._updateText();
  };

  // Below I had to call the updateText method to update the text content. DONE above in constructor. Just have this as reference to know what I did.
  // This method sets the text content of corresponding text element
  // I called this in the constructor like I mentioned above, and whenever the counts get updated
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
