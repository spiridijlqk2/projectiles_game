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

class BackgroundParticle {
  constructor({ position, radius = 3, color = "blue" }) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.alpha = 0.1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
