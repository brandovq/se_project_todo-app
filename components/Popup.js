class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscapeClose = this.handleEscapeClose.bind(this);
  }

  handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  //Removed the class from the popup element and also removed the escape listener below:
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    //This one listener will handle close button and and modal listener
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target === this._popupElement
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
