class Accordion {
  constructor(accordion) {
    this.accordion = accordion;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
    this._getHeight();
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

  _hideBody() {
    this.body.style.visibility = 'hidden';
    this.body.style.maxHeight = '0';
    this.body.style.padding = '0';
  }

  _showBody() {
    const paddingTop = 9;
    const paddingBottom = 30;
    this.body.style.visibility = 'visible';
    this.body.style.maxHeight = `${
      this.bodyHeight + paddingTop + paddingBottom
    }px`;
    this.body.style.padding = `${paddingTop}px 0 ${paddingBottom}px 0`;
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
