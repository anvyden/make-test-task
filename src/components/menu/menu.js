class Menu {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._findElements();
  }

  _findElements() {
    this.header = this.root.querySelector('.js-header');
  }

  open() {
    this.header.classList.add('header--style-menu');
    this.root.classList.add('menu--visible');
    this.root.style.display = 'flex';
  }

  close() {
    this.header.classList.remove('header--style-menu');
    this.root.classList.remove('menu--visible');
    this.root.style.display = 'none';
  }
}

export default Menu;
