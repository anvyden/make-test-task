import Menu from '../menu/menu';

class Header {
  constructor(header) {
    this.header = header;
    this._init();
  }

  _init() {
    this._findElements();
    this.menu = new Menu(this.menuNode);
    this._bindEventsListeners();
  }

  _findElements() {
    this.burger = this.header.querySelector('.js-header__burger');
    this.menuNode = document.querySelector('.js-menu');
    this.pageLayout = document.querySelector('.js-page-layout');
  }

  _bindEventsListeners() {
    this.burger.addEventListener(
      'pointerdown',
      this._handleBurgerPointerDown.bind(this),
    );
    this.burger.addEventListener(
      'keydown',
      this._handleBurgerKeyDown.bind(this),
    );
  }

  _handleBurgerPointerDown() {
    this._openMenu();
  }

  _handleBurgerKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();

      this._openMenu();
    }
  }

  _openMenu() {
    this.pageLayout.classList.add('page-layout--hidden');

    setTimeout(() => {
      this.menu.open();
      this.pageLayout.classList.remove('page-layout--hidden');
    }, 750);
  }
}

export default Header;
