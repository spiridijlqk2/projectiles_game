class Player extends Circle {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  update() {
    this.draw();

    const friction = 0.99;

    this.velocity.x *= friction;
    this.velocity.y *= friction;

    //collision detection for x axis
    if (
      this.x + this.radius + this.velocity.x <= canvas.width &&
      this.x - this.radius + this.velocity.x >= 0
    ) {
      this.x += this.velocity.x;
    } else {
      this.velocity.x = 0;
    }

    //collision detection for y axis
    if (
      this.y + this.radius + this.velocity.y <= canvas.height &&
      this.y - this.radius + this.velocity.y >= 0
    ) {
      this.y += this.velocity.y;
    } else {
      this.velocity.y = 0;
    }
  }
}
