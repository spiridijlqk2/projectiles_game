class Enemy extends Circle {
  constructor(x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = velocity;
    this.type = "Linear";
    this.radians = 0;
    this.center = {
      x,
      y,
    };

    if (Math.random() < 0.5) {
      this.type = "Homing";
      if (Math.random() < 0.5) {
        this.type = "Spinning";
        if (Math.random() < 0.5) {
          this.type = "Homing Spinning";
        }
      }
    }
  }

  update() {
    this.draw();
    if (this.type === "Spinning") {
      this.radians += 0.1;

      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;

      this.x = this.center.x + Math.cos(this.radians) * 30;
      this.y = this.center.y + Math.sin(this.radians) * 30;
    } else if (this.type === "Homing") {
      const angle = Math.atan2(player.y - this.y, player.x - this.x);
      this.velocity.x = Math.cos(angle);
      this.velocity.y = Math.sin(angle);
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    } else if (this.type === "Homing Spinning") {
      this.radians += 0.1;

      const angle = Math.atan2(
        player.y - this.center.y,
        player.x - this.center.x,
      );
      this.velocity.x = Math.cos(angle);
      this.velocity.y = Math.sin(angle);

      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;

      this.x = this.center.x + Math.cos(this.radians) * 30;
      this.y = this.center.y + Math.sin(this.radians) * 30;
    } else {
      //linear movement
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }
}

function spawnEnemies() {
  intervalId = setInterval(() => {
    const radius = Math.floor(Math.random() * 25) + 5;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}
