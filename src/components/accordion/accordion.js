class Accordion {
  constructor(accordion) {
    this.accordion = accordion;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
    this._getHeight();
    this._setPadding();
    this._hideBody();
  }

  _findElements() {
    this.body = this.accordion.querySelector('.js-accordion__body');
  }

  _bindEventsListeners() {
    this.accordion.addEventListener(
      'pointerdown',
      this._handleAccordionPointerDown.bind(this)
    );
    this.accordion.addEventListener(
      'keydown',
      this._handleAccordionKeyDown.bind(this)
    );
  }

  _handleAccordionPointerDown(event) {
    const { target } = event;
    const { type } = target.dataset;

    if (type === 'header') this._toggle();
  }

  _handleAccordionKeyDown(event) {
    const { target, code } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === 'header') this._toggle();
    }
  }

  _getHeight() {
    this.bodyHeight = this.body.offsetHeight;
  }

  _setPadding() {
    this.paddingTop = 9;
    this.paddingBottom = 30;
  }

  _hideBody() {
    this.body.style.visibility = 'hidden';
    this.body.style.maxHeight = '0';
    this.body.style.padding = '0';
  }

  _showBody() {
    this.body.style.visibility = 'visible';
    this.body.style.maxHeight = `${
      this.bodyHeight + this.paddingTop + this.paddingBottom
    }px`;
    this.body.style.padding = `${this.paddingTop}px 0 ${this.paddingBottom}px 0`;
  }

  _isOpened() {
    return this.accordion.classList.contains('accordion--opened');
  }

  _toggle() {
    this.accordion.classList.toggle('accordion--opened');

    this._isOpened() ? this._showBody() : this._hideBody();
  }
}

export default Accordion;
