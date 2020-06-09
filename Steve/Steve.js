class Util {
  static kebabCaseToCamelCase (kebabCase) {
    return kebabCase.split('-')
      .map((word, index) => (index > 0 ? word[0].toUpperCase() : word[0]) + word.substring(1))
      .join('');
  }
}

class CSSHandler {
  get (el, field) {
    return el.style[Util.kebabCaseToCamelCase(field)];
  }
  set (el, field, val) {
    el.style[Util.kebabCaseToCamelCase(field)] = val;
  }

  getPixel (el, field) {
    return Number.parseFloat(this.get(el, field)) || 0;
  }
  setPixel (el, field, val) {
    this.set(el, field, `${val}px`);
  }
  transferPixel (el, field, val) {
    this.setPixel(el, field, this.getPixel(el, field) + val);
  }
}

class CSSTransformHandler {
  get (el, field) {
    const transform = el.style.transform;
    const regexp = new RegExp(`${field}\\([^()]+\\)`);
    const val = (transform.match(regexp) || [''])[0];
    return val.replace(/ /g, '');
  }
  set (el, field, val) {
    let transform = el.style.transform;
    if (transform === '') {
      transform = [
        'translateX(0px)', 'translateY(0px)', 'translateZ(0px)',
        'rotateX(0deg)', 'rotateY(0deg)', 'rotateZ(0deg)',
      ].join(' ');
    }
    const regexp = new RegExp(`${field}\\([^()]+\\)`);
    if (regexp.test(transform)) {
      transform = transform.replace(regexp, val);
    } else {
      transform += ` ${val}`;
    }
    el.style.transform = transform;
  }

  // translateX
  getTranslateX (el) { return Number.parseFloat(this.get(el, 'translateX').substring(11)) || 0; }
  setTranslateX (el, val) { return this.set(el, 'translateX', `translateX(${val}px)`); }
  transferTranslateX (el, val) { return this.setTranslateX(el, this.getTranslateX(el) + val); }
  // translateY
  getTranslateY (el) { return Number.parseFloat(this.get(el, 'translateY').substring(11)) || 0; }
  setTranslateY (el, val) { return this.set(el, 'translateY', `translateY(${val}px)`); }
  transferTranslateY (el, val) { return this.setTranslateY(el, this.getTranslateY(el) + val); }
  // translateZ
  getTranslateZ (el) { return Number.parseFloat(this.get(el, 'translateZ').substring(11)) || 0; }
  setTranslateZ (el, val) { return this.set(el, 'translateZ', `translateZ(${val}px)`); }
  transferTranslateZ (el, val) { return this.setTranslateZ(el, this.getTranslateZ(el) + val); }
  // rotateX
  getRotateX (el) { return Number.parseFloat(this.get(el, 'rotateX').substring(8)) || 0; }
  setRotateX (el, val) { return this.set(el, 'rotateX', `rotateX(${val}deg)`); }
  transferRotateX (el, val) { return this.setRotateX(el, this.getRotateX(el) + val); }
  // rotateY
  getRotateY (el) { return Number.parseFloat(this.get(el, 'rotateY').substring(8)) || 0; }
  setRotateY (el, val) { return this.set(el, 'rotateY', `rotateY(${val}deg)`); }
  transferRotateY (el, val) { return this.setRotateY(el, this.getRotateY(el) + val); }
  // rotateZ
  getRotateZ (el) { return Number.parseFloat(this.get(el, 'rotateZ').substring(8)) || 0; }
  setRotateZ (el, val) { return this.set(el, 'rotateZ', `rotateZ(${val}deg)`); }
  transferRotateZ (el, val) { return this.setRotateZ(el, this.getRotateZ(el) + val); }
}

const css = new CSSHandler();
const cssTransform = new CSSTransformHandler();

class Steve {
  constructor () {
    this.NAMESPACE = 'steve'
    this.holding = null;
  }

  hold (el) {
    this.holding = el;
    return this;
  }
  release () {
    const held = this.holding;
    this.holding = null;
    return held;
  }
  putIn (container) {
    this._checkHolding();
    this.takeUp();
    container.appendChild(this.holding);
    return this;
  }
  takeUp (el) {
    if (el != null) {
      this.hold(el);
    }
    this._checkHolding();
    if (this.holding.parentNode) {
      this.holding.parentNode.removeChild(this.holding);
      this.moveTo(0, 0, 0);
    }
    return this;
  }
  moveTo (x, y, z) {
    this._checkHolding();
    x != null && css.setPixel(this.holding, 'left', x);
    y != null && css.setPixel(this.holding, 'top', y);
    z != null && cssTransform.setTranslateZ(this.holding, z);
    return this;
  }
  move (x, y, z) {
    this._checkHolding();
    this.moveX(x);
    this.moveY(y);
    this.moveZ(z);
    return this;
  }
  moveX (x) {
    this._checkHolding();
    x != null && css.transferPixel(this.holding, 'left', x);
    return this;
  }
  moveY (y) {
    this._checkHolding();
    y != null && css.transferPixel(this.holding, 'top', y);
    return this;
  }
  moveZ (z) {
    this._checkHolding();
    z != null && cssTransform.transferTranslateZ(this.holding, z);
    return this;
  }
  rotateTo (x, y, z) {
    this._checkHolding();
    this.rotateXTo(x);
    this.rotateYTo(y);
    this.rotateZTo(z);
    return this;
  }
  rotateXTo (x) {
    this._checkHolding();
    x != null && cssTransform.setRotateX(this.holding, x);
    return this;
  }
  rotateYTo (y) {
    this._checkHolding();
    y != null && cssTransform.setRotateY(this.holding, y);
    return this;
  }
  rotateZTo (z) {
    this._checkHolding();
    z != null && cssTransform.setRotateZ(this.holding, z);
    return this;
  }
  rotate (x, y, z) {
    this._checkHolding();
    this.rotateX(x);
    this.rotateY(y);
    this.rotateZ(z);
    return this;
  }
  rotateX (x) {
    this._checkHolding();
    x != null && cssTransform.transferRotateX(this.holding, x);
    return this;
  }
  rotateY (y) {
    this._checkHolding();
    y != null && cssTransform.transferRotateY(this.holding, y);
    return this;
  }
  rotateZ (z) {
    this._checkHolding();
    z != null && cssTransform.transferRotateZ(this.holding, z);
    return this;
  }
  
  _checkHolding() {
    if (this.holding == null) {
      throw new Error('hold nothing');
    }
  }

  createCore (width = 0, height = 0) {
    const core = document.createElement('div');
    core.classList.add(this.NAMESPACE, 'core');
    css.set(core, 'position', 'absolute');
    css.setPixel(core, 'width', width);
    css.setPixel(core, 'height', height);
    css.set(core, 'transform-style', 'preserve-3d');
    css.set(core, 'transform-origin', 'center center');
    this.hold(core);
    return this;
  }
  createPanel (width = 0, height = 0) {
    const panel = document.createElement('div');
    panel.classList.add(this.NAMESPACE, 'panel');
    panel.style.position = 'absolute';
    css.setPixel(panel, 'width', width);
    css.setPixel(panel, 'height', height);
    css.set(core, 'transform-origin', 'center center');
    this.hold(panel);
    return this;
  }
}

Steve.learn = function (knowledge) {
  knowledge.teach(Steve);
}

const rectangle = {
  
}
const cuboid = {
  teach: function (Steve) {
    Steve.prototype.createCuboid = function (length, width, height) {
      const core = this.createCore();
      core.classList.add('cuboid');
      const panels = [this.createPanel(), this.createPanel(), this.createPanel(), this.createPanel(), this.createPanel(), this.createPanel()];
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
};

Steve.learn(cuboid);
