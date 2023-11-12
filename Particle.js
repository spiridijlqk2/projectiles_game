(() => {
  const friction = 0.99;
  window.Particle = class Particle extends Circle {
    constructor(x, y, radius, color, velocity, alpha) {
      super(x, y, radius, color);
      this.velocity = velocity;
      this.alpha = 1;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      super.draw();
      ctx.restore();
    }

    update() {
      this.draw();
      this.velocity.x *= friction;
      this.velocity.y *= friction;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 0.01;
    }
  };
})();
