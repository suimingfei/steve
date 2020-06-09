const Hand = require('./body/Hand');

class Steve {
  constructor () {
    this.rightHand = new Hand();
    this.leftHand = new Hand();
  }

  pick (target) {
    return this.rightHand.pick(target);
  }

  release () {
    this.rightHand.release();
    this.leftHand.release();
  }

  rotateX() {

  }

  rotateY() {

  }

  put (x, y, z) {
    if (this.hold == null) return;
    this.hold.style.left = `${x}px`;
    this.hold.style.top = `${y}px`;
    this.hold.style.transform = `translateZ(${z}px)`;
    document.body.appendChild(this.hold);
    return this;
  }

  _createCore (width, height) {
    const core = document.createElement('div');
    core.classList.add('steve', 'core');
    core.style.position = 'absolute';
    core.style.width = width || 0;
    core.style.height = height || 0;
    core.style.transformStyle = 'preserve-3d';
    core.style.transformOrigin = 'center';
    return core;
  }

  _createPanels (amount) {
    const panels = [];
    while (amount-- > 0) {
      const panel = document.createElement('div');
      panel.classList.add('panel');
      panel.style.position = 'absolute';
      panels.push(panel);
    }
    return panels;
  }

  _handleTransform (transformStr) {

  }

  createCube (length, width, height) {
    const core = this._createCore();
    core.classList.add('cube');
    const panels = this._createPanels(6);
    const [front, back, right, left, top, bottom] = panels;
    front.classList.add('front');
    front.style.width = `${length}px`;
    front.style.left = `-${length/2}px`;
    front.style.height = `${height}px`;
    front.style.top = `-${height/2}px`;
    front.style.transform = `translateZ(${width/2}px)`;
    back.classList.add('back');
    back.style.width = `${length}px`;
    back.style.left = `-${length/2}px`;
    back.style.height = `${height}px`;
    back.style.top = `-${height/2}px`;
    back.style.transform = `rotateY(180deg) translateZ(${width/2}px)`;
    right.classList.add('right');
    right.style.width = `${width}px`;
    right.style.left = `-${width/2}px`;
    right.style.height = `${height}px`;
    right.style.top = `-${height/2}px`;
    right.style.transform = `rotateY(90deg) translateZ(${length/2}px)`;
    left.classList.add('left');
    left.style.width = `${width}px`;
    left.style.left = `-${width/2}px`;
    left.style.height = `${height}px`;
    left.style.top = `-${height/2}px`;
    left.style.transform = `rotateY(-90deg) translateZ(${length/2}px)`;
    top.classList.add('top');
    top.style.width = `${length}px`;
    top.style.left = `-${length/2}px`;
    top.style.height = `${width}px`;
    top.style.top = `-${width/2}px`;
    top.style.transform = `rotateX(90deg) translateZ(${height/2}px)`;
    bottom.classList.add('bottom');
    bottom.style.width = `${length}px`;
    bottom.style.left = `-${length/2}px`;
    bottom.style.height = `${width}px`;
    bottom.style.top = `-${width/2}px`;
    bottom.style.transform = `rotateX(-90deg) translateZ(${height/2}px)`;
    panels.forEach(panel => core.appendChild(panel));
    return core;
  }
}