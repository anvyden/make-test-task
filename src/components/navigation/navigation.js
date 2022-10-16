class Navigation {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._findElements();
    this._getCoords();
    this._windowScrollHandler();
    this.activeItem = this._changeActiveItem();
  }

  _findElements() {
    this.items = this.root.querySelectorAll('.js-navigation__item');
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
    window.addEventListener('scroll', this._changeActiveItem.bind(this));
  }

  _changeActiveItem() {
    const coordY = document.documentElement.getBoundingClientRect().top * -1;
    this.activeItem = this.activeItem ? this.activeItem : null;

    if (this.activeItem) {
      this.activeItem.classList.remove('navigation__item--active');
    }

    if (coordY <= this.gridCoordY - 1) {
      this._setActiveItem(0);
    } else if (coordY <= this.typographyCoordY - 1) {
      this._setActiveItem(1);
    } else if (coordY <= this.uiCoordY - 1) {
      this._setActiveItem(2);
    } else if (coordY >= this.uiCoordY) {
      this._setActiveItem(3);
    }
  }

  _setActiveItem(index) {
    this.activeItem = this.items[index];
    this.activeItem.classList.add('navigation__item--active');
  }
}

export default Navigation;
