// canvas setup --------------------------------------------------------------
const ctx = document.getElementById('draw').getContext('2d');
const width = window.innerWidth
const height = window.innerHeight
ctx.canvas.width = width
ctx.canvas.height = height

// helpers ------------------------------------------------------
function rng(min, max) {
  return Math.random() * (max * 2) + min
}

function rngInt(min, max) {
  return Math.floor(rng(min, max))
}

function HexColorArray(size) {
  const colorArray = [];
  let hexcolor = "#";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < 6; j++) {
      const rng16 = Math.floor(Math.random() * 16);
      const hex = rng16.toString(16);
      hexcolor += hex;
    }
    colorArray.push(hexcolor);
    hexcolor = "#";
  }
  return colorArray;
}

// init --------------------------------------------------------
let balls = new Array;
let colors = HexColorArray(4);

let mouse = {
  x: undefined,
  y: undefined,
};

function init(num) {
  for (let i = 0; i < num; i++) {
    balls.push(randomBall())
  }
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})

// randomBall --------------------------------------------------- 
function randomBall() {
  let ballSize = rng(0.1, 4);
  return {
    ballSize,
    xPos: rng(0, width / 2 - ballSize),
    yPos: rng(0, height / 2 - ballSize),
    xSpeed: rng(-3, 3),
    ySpeed: rng(-3, 3),
    color: colors[ rngInt(0, 4) ]
  }
}

// update --------------------------------------------------------
function update(b) {
  if (b.xPos < 0 + b.ballSize || b.xPos > width - b.ballSize) {
    b.xSpeed = -b.xSpeed
  }
  if (b.yPos < 0 + b.ballSize || b.yPos > height - b.ballSize) {
    b.ySpeed = -b.ySpeed
  }
  b.xPos += b.xSpeed;
  b.yPos += b.ySpeed;
  draw(b)
}

// draw --------------------------------------------------------
function draw(b) {
  ctx.beginPath();
  ctx.arc(b.xPos, b.yPos, b.ballSize, 0, Math.PI * 2, true);
  ctx.fillStyle = b.color;
  ctx.closePath();
  ctx.fill();
}

// animate ------------------------------------------------------
function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);
  balls.map(b => update(b));
}

init(400)
animate()