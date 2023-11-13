// import Player from "./Player";
// import Projectile from "./Projectile";
// import Particle from "./Particle";
// import Enemy from "./Enemy";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.querySelector("#score");
const modalEl = document.querySelector("#modalEl");
const modalScoreEl = document.querySelector("#modalScoreEl");
const buttonEl = document.querySelector("#buttonEl");
const startButtonEl = document.querySelector("#startButtonEl");
const startModalEl = document.querySelector("#startModalEl");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;

let player = new Player(x, y, 30, "white");
let projectiles = [];
let enemies = [];
let particles = [];
let animationId;
let intervalId;
let score = 0;

function init() {
  player = new Player(x, y, 30, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  animationId;
  score = 0;
  scoreEl.innerHTML = 0;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  for (let index = particles.length - 1; index >= 0; index--) {
    const particle = particles[index];
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  }
  for (let index = projectiles.length - 1; index >= 0; index--) {
    const projectile = projectiles[index];
    projectile.update();
    //remove from edges of screen
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  }
  for (let index = enemies.length - 1; index >= 0; index--) {
    const enemy = enemies[index];

    enemy.update();
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    //game over when an enemy touches the player
    if (distance - enemy.radius - player.radius < 0.001) {
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
      modalEl.style.display = "block";

      gsap.from("#modalEl", { scale: 0.8, opacity: 0 });
      modalScoreEl.innerHTML = score;
    }
    for (let projIndex = projectiles.length - 1; projIndex >= 0; projIndex--) {
      const projectile = projectiles[projIndex];

      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y,
      );
      //when projectiles touch an enemy
      if (distance - enemy.radius - projectile.radius < 0.01) {
        //create explosions
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 4,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6),
              },
            ),
          );
        }
        //shrink and remove enemies on hit
        if (enemy.radius - 10 > 5) {
          score += 1;
          scoreEl.innerHTML = score;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          projectiles.splice(projIndex, 1);
        } else {
          score += 5;
          scoreEl.innerHTML = score;
          enemies.splice(index, 1);
          projectiles.splice(projIndex, 1);
        }
      }
    }
  }
}

addEventListener("click", (event) => {
  const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
  const velocity = {
    x: Math.cos(angle) * 6,
    y: Math.sin(angle) * 6,
  };
  projectiles.push(new Projectile(player.x, player.y, 5, "white", velocity));
});

//restart game
buttonEl.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  gsap.to("#modalEl", {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: "expo.in",
    onComplete: () => {
      modalEl.style.display = "none";
    },
  });
});

//start game
startButtonEl.addEventListener("click", () => {
  animate();
  spawnEnemies();
  gsap.to("#startModalEl", {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: "expo.in",
    onComplete: () => {
      startModalEl.style.display = "none";
    },
  });
});

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      player.velocity.x += 1;
      break;
    case "ArrowUp":
      player.velocity.y -= 1;
      break;
    case "ArrowLeft":
      player.velocity.x -= 1;
      break;
    case "ArrowDown":
      player.velocity.y += 1;
      break;
  }
});
