const { kebabCaseToCamelCase } = require('./shared');

class CSSHandler {
  get (el, field) {
    return el.style[kebabCaseToCamelCase(field)];
  }
  set (el, field, val) {
    el.style[kebabCaseToCamelCase(field)] = val;
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

  // height
  getHeight (el) { return this.getPixel(el, 'height'); }
  setHeight (el, val) { this.setPixel(el, 'height', val); }
  transferHeight (el, val) { this.transformPixel(el, 'height', val); }
  // width
  getWidth (el) { return this.getPixel(el, 'width'); }
  setWidth (el, val) { this.setPixel(el, 'width', val); }
  transferWidth (el, val) { this.transformPixel(el, 'width', val); }
  // left
  getLeft (el) { return this.getPixel(el, 'left'); }
  setLeft (el, val) { this.setPixel(el, 'left', val); }
  transferLeft (el, val) { this.transformPixel(el, 'left', val); }
  // top
  getTop (el) { return this.getPixel(el, 'top'); }
  setTop (el, val) { this.setPixel(el, 'top', val); }
  transferTop (el, val) { this.transformPixel(el, 'top', val); }
  // transform
  getTransform (el) { return this.get(el, 'transform'); }
  setTransform (el, val) { this.set(el, 'transform', val); }
}

class CSSTransformHandler {
  get (el, field) {
    const transform = el.style.transform;
    const regexp = new RegExp(`/${field}\\([^()]+\\)/`);
    const val = (transform.match(regexp) || [''])[0];
    return val.replace(/ /g, '');
  }
  set (el, field, val) {
    const transform = el.style.transform;
    const regexp = new RegExp(`/${field}\\([^()]+\\)/`);
    if (regexp.test(transform)) {
      transform.replace(regexp, val);
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
}

const css = new CSSHandler();
const cssTransform = new CSSTransformHandler();

module.exports = {
  css,
  cssTransform
};