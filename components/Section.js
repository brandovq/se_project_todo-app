class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); //called the renderer in the constructor, and passed it the item as an argument
    });
  }

  addItem(element) {
    this._container.append(element); //Append aka added the element to the container
  }
}
//IMPORTANT note for renderItems above: Remember that anytime you hear that you need to iterate and you have an array, think about the for each method. An array is used when you have multiple items of the same type, ex. multiple todos
//So in this case, we have multiple todo items, so we use forEach to iterate through each todo item and call the renderer function on each one to render it to the page. An Array is used when you have brackets [ ]
//Like in the section instantiation in index.js, we passed initialTodos as an array to the items key. So in the Section class, we can use forEach to iterate through each item in the items array and call the renderer function on each item to render it to the page.

export default Section;
