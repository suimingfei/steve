const { css, cssTransform } = require('../util/CSSHandler');

class Hand {
  constructor () {
    this.holding = null;
  }

  pick (el) {
    this.holding = el;
    return this;
  }
  release () {
    this.holding = null;
  }

  putIn (container) {
    this._checkHolding();
    this.takeUp();
    container.appendChild(this.holding);
    return this;
  }

  takeUp () {
    this._checkHolding();
    if (this.holding.parentNode) {
      this.holding.parentNode.removeChild(this.holding);
    }
    return this;
  }

  move (x, y, z) {
    this._checkHolding();
    x != null && css.transferLeft(this.holding, x);
    y != null && css.transferTop(this.holding, y);
    z != null && cssTransform.transferTranslateZ(this.holding, z);
    return this;
  }
  
  _checkHolding() {
    if (this.holding == null) {
      throw new Error('hold nothing');
    }
  }
}

module.exports = Hand;