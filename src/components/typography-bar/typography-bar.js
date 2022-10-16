const typography = {
  description: [
    'Заголовок H1, 32/40, bold',
    'Заголовок H2, 28/36, bold',
    'Заголовок H3, 20/28, medium',
    'Заголовок H4, 18/28, medium',
    'Лид P_Lead, 20/28, regular',
    'Крупный текст P_18, 18/28, regular',
    'Основной текст P_16, 16/24, regular',
    'Впомогательный текст P_14, 14/20, regular',
  ],
  value: [
    'Текст заголовка',
    'Текст заголовка',
    'Текст заголовка',
    'Текст заголовка',
    'Текст лида',
    'Крупный текст',
    'Основной текст',
    'Вспомогательный текст',
  ],
  params: {
    desktop: [
      { fontSize: 48, lineHeight: 56 },
      { fontSize: 32, lineHeight: 40 },
      { fontSize: 24, lineHeight: 32 },
      { fontSize: 18, lineHeight: 28 },
      { fontSize: 24, lineHeight: 32 },
      { fontSize: 18, lineHeight: 28 },
      { fontSize: 16, lineHeight: 24 },
      { fontSize: 14, lineHeight: 20 },
    ],
    mobile: [
      { fontSize: 32, lineHeight: 40 },
      { fontSize: 28, lineHeight: 36 },
      { fontSize: 20, lineHeight: 28 },
      { fontSize: 18, lineHeight: 28 },
      { fontSize: 20, lineHeight: 28 },
      { fontSize: 18, lineHeight: 28 },
      { fontSize: 16, lineHeight: 24 },
      { fontSize: 14, lineHeight: 20 },
    ],
  },
};

class TypographyBar {
  constructor(root) {
    this.root = root;
    this.typography = typography;
    this._init();
  }

  _init() {
    this._findElements();
    this._renderList('desktop');
    this._setActiveButton('desktop');
    this._bindEventsListeners();
  }

  _findElements() {
    this.list = this.root.querySelector('.js-typography-bar__content-list');
    this.items = this.root.querySelectorAll('.js-typography-bar__content-item');
  }

  _bindEventsListeners() {
    this.root.addEventListener(
      'pointerdown',
      this._handleBarPointerDown.bind(this),
    );
    this.root.addEventListener('keydown', this._handleBarKeyDown.bind(this));
  }

  _handleBarPointerDown(event) {
    const { target } = event;
    const { type, screen } = target.dataset;

    if (type === 'button') {
      this.activeButton.classList.remove('typography-bar__button--active');
      this._renderList(screen);
      this._setActiveButton(screen);
    }
  }

  _handleBarKeyDown(event) {
    const { target, code } = event;
    const { type, screen } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === 'button') {
        this.activeButton.classList.remove('typography-bar__button--active');
        this._renderList(screen);
        this._setActiveButton(screen);
      }
    }
  }

  _renderList(screen) {
    const items = this._getNewItems(screen);
    this.list.classList.add('typography-bar__content-list--hidden');

    setTimeout(() => {
      items.forEach((item) => this.list.appendChild(item));
      this.list.classList.remove('typography-bar__content-list--hidden');
    }, 250);
  }

  _getNewItems(screen) {
    const newItems = [...this.items].map((item, i) => this._changeItem(item, i, screen));

    return newItems;
  }

  _changeItem(item, i, screen) {
    const newItem = item;
    const itemDescriptionNode = newItem.children[0].children[0];
    const itemValueNode = newItem.children[1].children[0];

    const descriptionText = this.typography.description[i];
    const valueText = this.typography.value[i];
    const { fontSize, lineHeight } = this.typography.params[screen][i];

    itemDescriptionNode.innerText = descriptionText;
    itemValueNode.innerText = valueText;
    itemValueNode.style.fontSize = `${fontSize}px`;
    itemValueNode.style.lineHeight = `${lineHeight}px`;

    return newItem;
  }

  _setActiveButton(screen) {
    this.activeButton = this.root.querySelector(`[data-screen=${screen}]`);
    this.activeButton.classList.add('typography-bar__button--active');
  }
}

export default TypographyBar;
