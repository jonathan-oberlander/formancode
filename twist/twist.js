// ---------------------------------------------------------
/** @type {CanvasRenderingContext2D} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = 600;
const h = 600;
ctx.canvas.width = w;
ctx.canvas.height = h;
// center the coordinate system

// ---------------------------------------------------------
function rng(val, offset) {
  return Math.random() * val + offset;
};

function HexColor() {
  let hexcolor = "#2ECF";
  for (let j = 0; j < 2; j++) {
    const rng16 = Math.floor(Math.random() * 16);
    const hex = rng16.toString(16);
    hexcolor += hex;
  }
  console.log(hexcolor)
  return hexcolor;
}


// ---------------------------------------------------------
function Update() {

  ctx.translate(w / 2, h / 2);

  const thickness = 1;
  const color = HexColor();
  const skew = { h: 0, v: 0 }
  const scale = { h: 0.9, v: 0.9 };

  ctx.transform(scale.h, skew.h, skew.v, scale.v, 0, 0);
  ctx.rotate((Math.PI / 180) * 1);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;

  Draw();

};

// ---------------------------------------------------------
function Draw() {

  // const rotation = 0;
  const amount = 100;
  const height = 70;
  let yo = 0;

  for (let i = -amount; i < amount; i++) {

    yo++
    const rotation = yo * 0.023;
    const spread = 2;

    // translate an rotate the coordinates
    ctx.translate(i * spread, 0);
    ctx.rotate((Math.PI / 180) * i * rotation);

    ctx.beginPath();
    ctx.moveTo(0, -height);
    ctx.lineTo(0, height);
    ctx.stroke();

    // reset the coordinates
    ctx.rotate((Math.PI / 180) * -i * rotation);
    ctx.translate(-i * spread, 0);
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

    // code ----------------------------
    ctx.resetTransform();
    ctx.clearRect(0, 0, w, h);
    Update();

  }
}

// initialize the timer variables and  -----------------------------
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

startAnimating(14);
