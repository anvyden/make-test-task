import Menu from '../menu/menu';

class Header {
  constructor(header) {
    this.header = header;
    this._init();
  }

  _init() {
    this._findElements();
    this._setup();
    this.menu = new Menu(this.menuNode);
    this._bindEventsListeners();
  }

  _findElements() {
    this.burger = this.header.querySelector('.js-header__burger');
    this.menuNode = document.querySelector('.js-menu');
    this.pageLayout = document.querySelector('.js-page-layout');
  }

  _setup() {
    this.burgerId = this.burger.dataset.id;
    console.log(this.burgerId);
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
    if (this.burgerId === 'open') this._openMenu();
    if (this.burgerId === 'close') this._closeMenu();
  }

  _handleBurgerKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();

      if (this.burgerId === 'open') this._openMenu();
      if (this.burgerId === 'close') this._closeMenu();
    }
  }

  _openMenu() {
    this.pageLayout.classList.add('page-layout--hidden');
    this.menu.open();
    setTimeout(() => {
      this.pageLayout.style.display = 'none';
    }, 750);
  }

  _closeMenu() {
    this.pageLayout.classList.remove('page-layout--hidden');
    this.menu.close();
    setTimeout(() => {
      this.pageLayout.style.display = 'block';
    }, 750);
  }
}

export default Header;
