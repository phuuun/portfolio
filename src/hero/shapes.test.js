import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pointsFromMask } from './shapes.js'

const lcg = (seed = 1) => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

const mask = (w, h, fill) => {
  const a = new Uint8ClampedArray(w * h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (fill(x, y)) a[y * w + x] = 255
  return a
}

test('samples exactly count points', () => {
  const m = mask(10, 4, (x, y) => x >= 3 && x < 7 && y >= 1 && y < 3)
  assert.equal(pointsFromMask(m, 10, 4, 500, { rand: lcg() }).length, 1500)
})

test('points stay inside the unit box', () => {
  const m = mask(10, 4, () => true)
  const p = pointsFromMask(m, 10, 4, 500, { rand: lcg(7) })
  for (let i = 0; i < p.length; i += 3) {
    assert.ok(Math.abs(p[i]) <= 1 && Math.abs(p[i + 1]) <= 1)
    assert.ok(Math.abs(p[i + 2]) <= 0.075 + 1e-6)
  }
})

test('points land on filled pixels only', () => {
  const m = mask(10, 4, (x) => x < 5)
  const p = pointsFromMask(m, 10, 4, 500, { rand: lcg(3) })
  for (let i = 0; i < p.length; i += 3) assert.ok(p[i] <= 0)
})

test('empty mask throws', () => {
  assert.throws(() => pointsFromMask(new Uint8ClampedArray(40), 10, 4, 10), /empty/)
})
