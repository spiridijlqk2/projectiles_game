class Circle {
  constructor(x, y, radius, color /*velocity = { x: 0, y: 0 }*/) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    // this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    // this.drawTrace();
  }

  // drawTrace() {
  //   const max = Math.max(this.radius * 1.5, 30);
  //   for (let i = 1; i <= max; i++) {
  //     const x = this.x - this.velocity.x * i;
  //     const y = this.y - this.velocity.y * i;
  //     const radius = (this.radius * ((100 / max) * (max - i))) / 100;
  //     ctx.save();
  //     ctx.globalAlpha = ((max / 100) * (max - i)) / 100;
  //     ctx.beginPath();
  //     ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
  //     ctx.fillStyle = this.color;
  //     ctx.fill();
  //     ctx.restore();
  //   }
  // }

  // update() {
  //   this.draw();
  //   // this.velocity.x *= 1.01;
  //   // this.velocity.y *= 1.01;
  //   this.x += this.velocity.x;
  //   this.y += this.velocity.y;
  // }
}
