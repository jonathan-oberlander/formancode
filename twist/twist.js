// ---------------------------------------------------------
/** @type {CanvasRenderingContext2D} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = 600;
const h = 600;
ctx.canvas.width = w;
ctx.canvas.height = h;
// center the coordinate system
ctx.translate(w / 2, h / 2);

// ---------------------------------------------------------
const rotation = 1.2;
const spread = 10;
const amount = 80;
const height = 80;
const scale = 0.35;
const thickness = 2;

// ---------------------------------------------------------
ctx.scale(scale, scale);
ctx.transform(1, 0, 0, 1, 0, 0);
ctx.rotate((Math.PI / 180) * 1);
ctx.lineWidth = thickness;

// ---------------------------------------------------------
for (let i = -amount; i < amount; i++) {

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
