//CREATE CLASS
class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  // (1) Main TODO - Implement all the other methods

  // (2) second TODO - implement the _checkinputValidity method below
  // (a) copy body of existing function
  // (b) work through errors in console as we did for enable Validation
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // If the input is invalid, this will show the error message
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // If the input is valid, this will hide the error message
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass); // Adds error class to input
    errorElement.textContent = errorMessage; // Sets the error message text
    errorElement.classList.add(this._errorClass); // Shows the error message
  }

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass); // Removes error class from input
    errorElement.textContent = ""; // Clears the error message text
    errorElement.classList.remove(this._errorClass); // Hides the error message
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    // (2) third TODO - finish implementing _setEventListeners below
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    // Toggle the button state initially
    this._toggleButtonState();

    // Adds input event listeners to each input field
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
        // toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // If any input is invalid, disable the button
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // If all inputs are valid, enable the button
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    // Checks if any input in the form is invalid
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  // Resets validation method
  resetValidation() {
    // Two lines below: resets validation state (e.g., clear error messages, enable submit button)
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // Reuses the existing hideInputError method instead of rewriting code.
    });

    this._formEl.reset(); // resets the form fields
    this._toggleButtonState();
  }
}

export default FormValidator;
