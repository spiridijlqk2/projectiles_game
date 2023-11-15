class PowerUp {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;

    this.image = new Image();
    this.image.src = "./img/lightningBolt.png";

    this.alpha = 1;
    gsap.to(this, {
      alpha: 0,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });
    this.radians = 0;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(
      this.x + this.image.width / 2,
      this.y + this.image.height / 2,
    );
    ctx.rotate(this.radians);
    ctx.translate(
      -this.x - this.image.width / 2,
      -this.y - this.image.height / 2,
    );
    ctx.drawImage(this.image, this.x, this.y);
    ctx.restore();
  }

  update() {
    this.draw();
    this.radians += 0.01;
    this.x += this.velocity.x;
  }
}

function spawnPowerUps() {
  spawnPowerUpsId = setInterval(() => {
    powerUps.push(
      new PowerUp(-30, Math.random() * canvas.height, {
        x: Math.random() + 1,
        y: 0,
      }),
    );
  }, 10000);
}
