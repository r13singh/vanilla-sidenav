class SideNav {
  constructor() {
    this.hamburgerElem = document.querySelector('.hamburger');
    this.sideNavElem = document.querySelector('.side-nav');
    this.sideNavPanelElem = document.querySelector('.side-nav__panel');
    this.sideNavCloseElem = document.querySelector('.side-nav__close');
    this.sideNavBackdropElem = document.querySelector('.side-nav__backdrop');

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);

    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.addEventListeners();
    this.startX = 0;
    this.offsetX = 0;
  }

  addEventListeners() {
    this.hamburgerElem.addEventListener('click', this.showSideNav);
    this.sideNavCloseElem.addEventListener('click', this.hideSideNav);
    this.sideNavBackdropElem.addEventListener('click', this.hideSideNav);
    this.sideNavPanelElem.addEventListener('pointerdown', this.onPointerDown);
    this.sideNavPanelElem.addEventListener('pointermove', this.onPointerMove);
    this.sideNavPanelElem.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerDown(e) {
    if (e.pointerType !== "touch") {
      return;
    }
    this.startX = e.pageX;
    this.currentX = e.pageX;
  }

  onPointerMove(e) {
    if (e.pointerType !== "touch") {
      return;
    }
    this.offsetX = e.pageX - this.startX;
    this.offsetX = this.offsetX > 0 ? 0 : Math.round(this.offsetX);
    this.sideNavPanelElem.style.transform = `translateX(${this.offsetX}px)`;
  }

  onPointerUp(e) {
    if (e.pointerType !== "touch") {
      return;
    }
    if (this.offsetX < -100) {
      this.offsetX = 0;
      this.startX = 0;
      this.hideSideNav();
    } else {
      this.sideNavPanelElem.style.transform = '';
      this.showSideNav();
    }
  }

  onTransitionEnd() {
    this.sideNavPanelElem.classList.remove('side-nav__panel--animatable');
    this.sideNavPanelElem.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav() {
    this.sideNavElem.classList.add('side-nav--visible');
    this.sideNavPanelElem.classList.add('side-nav__panel--animatable');
    this.sideNavPanelElem.addEventListener('transitionend', this.onTransitionEnd);
  }

  hideSideNav() {
    this.sideNavElem.classList.remove('side-nav--visible');
    this.sideNavPanelElem.classList.add('side-nav__panel--animatable');
    this.sideNavPanelElem.addEventListener('transitionend', this.onTransitionEnd);
    this.sideNavPanelElem.style.transform = '';
  }
}

const sidenav = new SideNav();