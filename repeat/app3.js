// canvas setup --------------------------------------------------------------

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

const width = window.innerWidth * 0.9;
const height = window.innerHeight * 0.9;

console.log(width, height)

ctx.canvas.width = width
ctx.canvas.height = height
ctx.fillStyle = 'transparent';
ctx.fillRect(0, 0, width, height);


// helpers ------------------------------------------------------

Number.prototype.maping = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function rng(val, offset) {
  return Math.random() * val + offset
}

function HexColor() {
  let hexcolor = "#cc23";
  for (let j = 0; j < 2; j++) {
    const rng16 = Math.floor(Math.random() * 16);
    const hex = rng16.toString(16);
    hexcolor += hex;
  }
  console.log(hexcolor)
  return hexcolor;
}



// randon pattern -----------------------------------------------
function arcs(amnt, num, count, offset, size, length) {

  for (let x = amnt; x <= width - amnt; x += num) {

    for (let y = amnt; y <= height - amnt; y += num) {
      ctx.strokeStyle = HexColor()

      let s = count.maping(120, 0, 0, (Math.PI * 2) * offset);

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        size,
        s,
        Math.PI * length + s
      );
      ctx.stroke();
      count--;
    }
  }
};

// update --------------------------------------------------------
function update() {
  for (let i = 0; i < 2; i++) {
    // arcs(
    //   50,  // amnt
    //   28,  // num
    //   90,  // count
    //   1,    // offset
    //   400,  // size
    //   0.1,   // PI length
    // )

    arcs(
      rng(1, 1),  // amnt
      10,  // num
      rng(1, 0),  // count
      rng(1, 1),    // offset
      rng(1, 19),  // size
      rng(0.1, 0.5),   // length
    )

  }
}


// throttle animationframe -----------------------------------------
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

function animate(play) {
  if (!play) return;

  requestAnimationFrame(animate);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    // code ----------------------------
    ctx.clearRect(0, 0, width, height);
    update()
  }
}

// initialize the timer variables and  -----------------------------
function startAnimating(play, fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate(play);
}

startAnimating(false, 1);


//  ---------------------------------------------------------------
// function createCanvas(el, w, h) {
//   document.body.innerHTML += `<canvas id="${el}"></canvas>`;
//   const c = document.getElementById(el).getContext('2d');
//   c.canvas.width = w;
//   c.canvas.height = h;
//   return c
// }