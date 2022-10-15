class Menu {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._findElements();
    this._getCoords();
    this._windowScrollHandler();
    this.activeItem = this._setActiveItem();
  }

  _findElements() {
    this.items = this.root.querySelectorAll('.js-menu__item');
    this.task = document.getElementById('task');
    this.grid = document.getElementById('grid');
    this.typography = document.getElementById('typography');
    this.ui = document.getElementById('ui');
  }

  _getCoords() {
    this.taskCoordY = this.task.offsetTop;
    this.gridCoordY = this.grid.offsetTop;
    this.typographyCoordY = this.typography.offsetTop;
    this.uiCoordY = this.ui.offsetTop;
  }

  _windowScrollHandler() {
    window.addEventListener('scroll', this._setActiveItem.bind(this));
  }

  _setActiveItem() {
    const coordY = document.documentElement.getBoundingClientRect().top * -1;
    this.activeItem = this.activeItem ? this.activeItem : null;

    if (this.activeItem) {
      this.activeItem.classList.remove('menu__item--active');
    }

    if (coordY <= this.gridCoordY - 1) {
      this.items[0].classList.add('menu__item--active');
      this.activeItem = this.items[0];
    } else if (coordY <= this.typographyCoordY - 1) {
      this.items[1].classList.add('menu__item--active');
      this.activeItem = this.items[1];
    } else if (coordY <= this.uiCoordY - 1) {
      this.items[2].classList.add('menu__item--active');
      this.activeItem = this.items[2];
    } else if (coordY >= this.uiCoordY) {
      this.items[3].classList.add('menu__item--active');
      this.activeItem = this.items[3];
    }
  }

  // _bindEventsListeners() {
  //   this.items.forEach((item) => {
  //     item.addEventListener('pointerdown', this._handleItemPointerDown(item));
  //     item.addEventListener('keydown', this._handleItemKeyDown(item));
  //   });
  // }

  // _handleItemPointerDown(item) {
  //   item.classList.add('menu__item--active');
  // }

  // _handleItemKeyDown(item) {
  //   item.classList.add('menu__item--active');
  // }
}

export default Menu;
