// canvas setup --------------------------------------------------------------

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

const width = window.innerWidth
const height = window.innerHeight

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

function HexColor(size) {
  let hexcolor = "#";
  for (let j = 0; j < 6; j++) {
    const rng16 = Math.floor(Math.random() * 16);
    const hex = rng16.toString(16);
    hexcolor += hex;
  }
  console.log(hexcolor)
  return hexcolor;
}

// randon pattern -----------------------------------------------
function arcs(amnt, count, size, offset, num, length) {
  ctx.strokeStyle = HexColor()
  for (let x = amnt; x <= width - amnt; x += num) {
    for (let y = amnt; y <= height - amnt; y += num) {
      let s = count.maping(120, 0, 0, (Math.PI * 2) * offset);
      ctx.beginPath();
      ctx.arc(
        x + (Math.random() * 20),
        y + (Math.random() * 20),
        size + (Math.random() * 20),
        s,
        Math.PI / length + s
      );
      ctx.stroke();
      count--;
    }
  }
};

// update --------------------------------------------------------
function update() {
  for (let i = 0; i < 2; i++) {
    arcs(
      rng(8, 0),  // amnt
      160,  // count
      10,  // size
      120,    // offset
      rng(12, 1),  // num
      rng(20, 1),   // length
    )

    // arcs(
    //   rng(80, 1),  // amnt
    //   rng(360, 0),  // count
    //   rng(130, 0),  // size
    //   rng(9, 2),    // offset
    //   56,  // num
    //   rng(20, 1),   // length
    // )

  }
}

function animate(speed) {
  // setInterval(() => {
  window.requestAnimationFrame(update);
  ctx.clearRect(0, 0, width, height);
  ctx.fillRect(0, 0, width, height);
  // }, speed);
}

animate(70)


// function createCanvas(el, w, h) {
//   document.body.innerHTML += `<canvas id="${el}"></canvas>`;
//   const c = document.getElementById(el).getContext('2d');
//   c.canvas.width = w;
//   c.canvas.height = h;
//   return c
// }