class TextField {
  constructor(textField) {
    this.textField = textField;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
  }

  _findElements() {
    this.input = this.textField.querySelector('.js-text-field__input');
    this.prompt = this.textField.querySelector('.js-text-field__prompt');
    this.error = this.textField.querySelector('.js-text-field__error');
  }

  _bindEventsListeners() {
    this.input.addEventListener('focus', this._handleInputOnFocus.bind(this));
    this.input.addEventListener('blur', this._handleInputOnBlur.bind(this));
  }

  _handleInputOnBlur(event) {
    const { value } = event.target;
    this._checkValue(value);

    if (!value) {
      this.prompt.classList.remove('text-field__prompt--visible');
      this.textField.classList.remove('text-field--invalid');
    }
  }

  _handleInputOnFocus() {
    this.prompt.classList.add('text-field__prompt--visible');
    this.textField.classList.remove('text-field--invalid');
  }

  _checkValue(value) {
    if (!this._isValid(value)) {
      this.textField.classList.add('text-field--invalid');
    } else {
      this.textField.classList.remove('text-field--invalid');
    }
  }

  _isValid(value) {
    return value.includes('@') && value.trim().length > 6;
  }
}

export default TextField;
