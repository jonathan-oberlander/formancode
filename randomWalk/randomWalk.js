// ---------------------------------------------------------
/** @type {CanvasRenderingContext2D} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = 600;
const h = 600;
ctx.canvas.width = w;
ctx.canvas.height = h;
const thick = 9;
ctx.fillStyle = 'white';

ctx.translate(w / 2, h / 2);
ctx.scale(2, 2);

// ---------------------------------------------------------
function grayShade(posX) {
  const rng = posX + 1 * 200 + (Math.random() * 55);
  return `rgb(${rng}, ${rng}, ${rng})`
}

// ---------------------------------------------------------
let mouse = { x: 0, y: 0, }
canvas.addEventListener('mousemove', function (evt) {
  mouse.x = (evt.layerX / w) * 2 - 1
  mouse.y = (evt.layerY / h) * 2 - 1
})

// ---------------------------------------------------------
class Walker {

  x;
  y;

  constructor(size) {
    this.x = 0;
    this.y = 0;
    this.size = size
  }

  draw() {
    // ctx.clearRect(-w / 2, -h / 2, w, h);

    ctx.fillStyle = grayShade(mouse.x);
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.stroke();
  }

  update() {
    let stepX = Math.random() * 2 - 1;
    let stepY = Math.random() * 2 - 1;

    let r = Math.random();
    if (r < mouse.x) {
      this.x++;
    }
    if (r < -mouse.x) {
      this.x--;
    }
    if (r < mouse.y) {
      this.y++;
    }
    if (r < -mouse.y) {
      this.y--;
    }

    this.x += stepX;
    this.y += stepY;

    this.draw();
  }

}

// throttle animationframe -----------------------------------------
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

function animate() {
  if (stop) return;
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    walker.update()
  }
}

// initialize the timer variables and  -----------------------------
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

// start the animation ----------------------------------------------
const walker = new Walker(2);
startAnimating(10);
