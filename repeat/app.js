// canvas setup --------------------------------------------------------------
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

const width = window.innerWidth
const height = window.innerHeight

console.log(width, height)

ctx.canvas.width = width
ctx.canvas.height = height
ctx.fillStyle = 'black';
ctx.strokeStyle = 'lightpink'
ctx.fillRect(0, 0, width, height)

// stitches()
arcs(
  Math.random() * 360,
  Math.random() * 630,
  Math.random() * 9,
  Math.random() * 70 + 12,
  Math.random() * 20 + 1
)

// patterns --------------------------------------------------------------

function stitches(fac = 6) {
  for (let x = 50; x <= width - 50; x += 20) {
    for (let y = 50; y <= height - 50; y += 20) {

      ctx.beginPath();
      ctx.moveTo(x - fac, y - fac);
      ctx.lineTo(x + fac, y + fac);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + fac, y - fac);
      ctx.lineTo(x - fac, y + fac);
      ctx.closePath();
      ctx.stroke();

    }
  }
}

function perspective() {
  for (let x = 50; x <= width - 50; x += 20) {
    for (let y = 50; y <= height - 50; y += 20) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(width / 2, height / 2);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function circles() {
  for (let x = 50; x <= width - 50; x += 20) {
    for (let y = 50; y <= height - 50; y += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2)
      ctx.stroke();
    }
  }
}

function arcs(count = 150, size = 7, offset = 2, num = 20, length = 1) {
  Number.prototype.maping = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
  for (let x = 50; x <= width - 50; x += num) {
    for (let y = 50; y <= height - 50; y += num) {
      let s = count.maping(120, 0, 0, (Math.PI * 2) * offset);
      ctx.beginPath();
      ctx.arc(x, y, size, s, Math.PI / length + s)
      ctx.stroke();
      count--;
    }
  }
};

function groupOfFive() {
  for (let x = 50; x < width - 50; x += 20) {
    for (let y = 50; y < height - 50; y += 20) {
      for (let i = 0; i < 16; i += 4) {
        ctx.beginPath();
        ctx.moveTo(x + i, y);
        ctx.lineTo(x + i, y + 12);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 12, y + 12);
      ctx.closePath();
      ctx.stroke();
    }
  }
}
