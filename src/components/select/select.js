class Select {
  constructor(select) {
    this.select = select;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
  }

  _bindEventsListeners() {
    this.select.addEventListener(
      'pointerdown',
      this._handleSelectPointerDown.bind(this)
    );
    this.select.addEventListener(
      'keydown',
      this._handleSelectKeyDown.bind(this)
    );
    document.addEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this)
    );
  }

  _handleDocumentPointerDown(event) {
    if (!this._isPointerDownOnSelect(event)) this._close();
  }

  _isPointerDownOnSelect({ target }) {
    return this.select.contains(target);
  }

  _handleSelectPointerDown(event) {
    const { target } = event;
    const { type } = target.dataset;

    if (type === 'input') this._toggle();
    if (type === 'button') this._toggle();
    if (type === 'item') this._setInputValue(target);
  }

  _handleSelectKeyDown(event) {
    const { target, code } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === 'input') this._toggle();
      if (type === 'button') this._toggle();
      if (type === 'item') this._setInputValue(target);
    }
  }

  _findElements() {
    this.input = this.select.querySelector('.js-select__input');
    this.drop = this.select.querySelector('.js-select__drop');
    this.arrow = this.select.querySelector('.js-select__button-arrow');
    this.prompt = this.select.querySelector('.js-select__prompt');

    this.placeholder = this.input.placeholder;
  }

  _setInputValue(target) {
    this.item = this.item ? this.item : target;

    if (this.input !== target) {
      this.item.classList.remove('select__item--active');

      this.item = target;
      this.input.value = this.item.innerText;
      this.item.classList.add('select__item--active');
    }
    this._close();
  }

  _toggle() {
    this.select.classList.toggle('select--opened');
  }

  _close() {
    this.select.classList.remove('select--opened');
  }
}

export default Select;
