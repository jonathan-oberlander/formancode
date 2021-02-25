// ---------------------------------------------------------
const display = document.querySelector('.display')

// ---------------------------------------------------------
/** @type {CanvasRenderingContext2D} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = 450;
const h = 450;
ctx.canvas.width = w;
ctx.canvas.height = h;

// ---------------------------------------------------------
function rng(val, offset) {
  return Math.random() * val + offset;
};

function HexColor() {
  let hexcolor = "#52";
  for (let j = 0; j < 4; j++) {
    const rng16 = Math.floor(Math.random() * 16);
    const hex = rng16.toString(16);
    hexcolor += hex;
  }
  // console.log(hexcolor)
  return hexcolor;
}

// ---------------------------------------------------------
let _f = 0;
let _g = 0;
let _i = 0;
const color = HexColor();
const thickness = 1;

// ---------------------------------------------------------

function Update() {

  ctx.translate(w / 2, h / 2);

  const skew = { h: 0, v: 0 }
  const scale = { h: 0.2, v: 0.2 };

  ctx.transform(scale.h, skew.h, skew.v, scale.v, -0, 0);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  Draw();

};

function triangle(l, r) {
  ctx.rotate((Math.PI / 180) * r);
  ctx.beginPath();
  ctx.moveTo(0, -l);
  ctx.lineTo(0, l);
  ctx.lineTo(-l, 0);
  ctx.lineTo(0, -l);
  ctx.stroke();
  ctx.rotate((Math.PI / 180) * -r);

}

function Draw() {

  const rot = 9;
  const size = 300;
  const spread = 40;
  const countY = 30;
  const countX = 20;

  for (let j = -countY; j < countY; j++) {

    ctx.translate(0, j * countY);

    ctx.strokeStyle = HexColor();

    for (let i = -countX; i < countX; i++) {

      ctx.translate(i * spread, 0);

      triangle(
        size * Math.random() * i,
        rot * -j * i
      );

      ctx.translate(-i * spread, 0);
    }

    ctx.translate(0, -j * countY);
  }

}


// throttle animationframe -----------------------------------------
let stop = false;



// let _c = 0;
// function spd(rate) {
//   _c++
//   if (_c % rate === 0) {
//     ctx.resetTransform()
//     ctx.clearRect(0, 0, w, h);
//     Update();
//   }
// }

Update();

function mainLoop() {
  // spd(6)
  requestAnimationFrame(mainLoop);
};

mainLoop()



// ---------------------------------------------------------
// function Draw() {

//   _f++
//   _g = Math.sin(_f * 0.03)
//   _i = Math.cos(_f * 0.02)

//   // display.textContent = _g
//   let _h = 0

//   // const rotation = 0;
//   const amount = 70;
//   const height = 90;
//   // let yo = 0;

//   for (let j = -amount; j < amount; j++) {

//     for (let i = -amount * 2.2; i < amount * 0.3; i++) {

//       _h++

//       // yo = yo + 1 + f
//       const rotation = (_f + _h * _i * 0.2) * .00001;
//       const spread = Math.log(_f) * j * 0.2 + i;

//       // translate an rotate the coordinates
//       ctx.translate(j * spread * _i, 0);
//       ctx.rotate((Math.PI / 180) * rotation);

//       ctx.beginPath();
//       ctx.moveTo(0.2 * _h, -height - _i);
//       ctx.lineTo(0.2 * _h, height - _i);
//       ctx.stroke();

//       // reset the coordinates
//       ctx.rotate((Math.PI / 180) * -i * rotation);
//       ctx.translate(-j * spread * _i, 0);
//     }
//   }

// }