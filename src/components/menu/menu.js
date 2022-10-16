class Menu {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
  }

  _findElements() {
    this.burger = this.root.querySelector('.js-menu__burger');
    this.pageLayout = document.querySelector('.js-page-layout');
    this.header = document.querySelector('.js-header');
  }

  _bindEventsListeners() {
    this.burger.addEventListener(
      'pointerdown',
      this._handleBurgerPointerDown.bind(this)
    );
    this.burger.addEventListener(
      'keydown',
      this._handleBurgerKeyDown.bind(this)
    );
  }

  _handleBurgerPointerDown() {
    this.close();
  }

  _handleBurgerKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();

      this.close();
    }
  }

  open() {
    this.root.classList.add('menu--visible');
    this.root.style.display = 'flex';
    this.header.style.display = 'none';
  }

  close() {
    this.root.classList.remove('menu--visible');
    this.pageLayout.classList.add('page-layout--hidden');

    setTimeout(() => {
      this.root.style.display = 'none';
      this.header.style.display = 'flex';
      this.pageLayout.classList.remove('page-layout--hidden');
    }, 750);
  }
}

export default Menu;
