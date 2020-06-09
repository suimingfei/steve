const cuboid = {
  teach: function (Steve) {
    Steve.prototype.createCuboid = function (length, width, height) {
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
};

module.exports = cuboid;