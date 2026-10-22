export const SHAPES = Object.freeze(['controller', 'net', 'browser', 'phone'])

export function pointsFromMask(alpha, width, height, count, { depth = 0.15, rand = Math.random } = {}) {
  const filled = []
  for (let i = 0; i < alpha.length; i++) if (alpha[i] > 127) filled.push(i)
  if (!filled.length) throw new Error('empty mask')
  const half = Math.max(width, height) / 2
  const out = new Float32Array(count * 3)
  for (let n = 0; n < count; n++) {
    const idx = filled[Math.floor(rand() * filled.length)]
    const px = (idx % width) + rand()
    const py = Math.floor(idx / width) + rand()
    out[n * 3] = (px - width / 2) / half
    out[n * 3 + 1] = -(py - height / 2) / half
    out[n * 3 + 2] = (rand() - 0.5) * depth
  }
  return out
}

const circle = (c, x, y, r) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill() }

const roundRect = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fill() }

const draw = {
  net: (c) => {
    const layers = [3, 5, 5, 3]
    const pos = layers.map((n, l) =>
      Array.from({ length: n }, (_, i) => [64 + l * (384 / 3), 256 + (i - (n - 1) / 2) * 80]))
    c.lineWidth = 2
    c.strokeStyle = '#000'
    for (let l = 0; l < 3; l++)
      for (const [x1, y1] of pos[l]) for (const [x2, y2] of pos[l + 1]) {
        c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke()
      }
    pos.flat().forEach(([x, y]) => circle(c, x, y, 22))
  },
  controller: (c) => {
    // body + grips, then punch out the details with destination-out
    roundRect(c, 40, 120, 432, 170, 80)
    roundRect(c, 60, 200, 120, 200, 55)
    roundRect(c, 332, 200, 120, 200, 55)
    c.globalCompositeOperation = 'destination-out'
    roundRect(c, 100, 175, 22, 70, 3) // d-pad
    roundRect(c, 76, 199, 70, 22, 3)
    ;[[392, 175], [392, 245], [357, 210], [427, 210]].forEach(([x, y]) => circle(c, x, y, 14))
    c.globalCompositeOperation = 'source-over'
    circle(c, 200, 270, 26) // sticks
    circle(c, 312, 270, 26)
    c.globalCompositeOperation = 'destination-out'
    circle(c, 200, 270, 14)
    circle(c, 312, 270, 14)
    c.globalCompositeOperation = 'source-over'
  },
  browser: (c) => {
    c.strokeStyle = '#000'
    c.lineWidth = 14
    c.beginPath(); c.roundRect(40, 80, 432, 352, 24); c.stroke()
    c.fillRect(40, 136, 432, 10) // title bar
    ;[82, 116, 150].forEach((x) => circle(c, x, 108, 11))
    // </> in strokes, centered in the content area
    c.lineWidth = 24
    c.lineCap = 'round'
    c.lineJoin = 'round'
    c.beginPath()
    c.moveTo(196, 232); c.lineTo(144, 290); c.lineTo(196, 348)
    c.moveTo(280, 222); c.lineTo(232, 358)
    c.moveTo(316, 232); c.lineTo(368, 290); c.lineTo(316, 348)
    c.stroke()
  },
  phone: (c) => {
    c.strokeStyle = '#000'
    c.lineWidth = 14
    c.beginPath(); c.roundRect(146, 36, 220, 440, 40); c.stroke()
    circle(c, 256, 72, 11) // punch-hole camera
    roundRect(c, 211, 444, 90, 11, 5.5) // home indicator
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 3; col++) roundRect(c, 166 + col * 68, 112 + row * 72, 44, 44, 10)
  },
}

export async function makeShape(name, count) {
  if (!Object.hasOwn(draw, name)) throw new Error(`unknown shape: ${name}`)
  const w = 512
  const h = 512
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const c = canvas.getContext('2d', { willReadFrequently: true })
  c.fillStyle = '#000'
  draw[name](c)
  const px = c.getImageData(0, 0, w, h).data
  const alpha = new Uint8ClampedArray(w * h)
  for (let i = 0; i < alpha.length; i++) alpha[i] = px[i * 4 + 3]
  return pointsFromMask(alpha, w, h, count)
}
