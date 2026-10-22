import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  LinearSRGBColorSpace,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { SHAPES, makeShape } from './shapes.js'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/motion.js'

const FOV = 35
const MORPH_EVERY = 4
const TILT = 0.15

const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aRandom;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;

  void main() {
    // each point starts its morph at a slightly different time
    float p = smoothstep(0.0, 1.0, clamp(uProgress * 1.4 - aRandom * 0.4, 0.0, 1.0));
    vec3 pos = mix(aFrom, aTo, p);

    float t = uTime + aRandom * 6.283;
    pos.xy += 0.01 * vec2(cos(t), sin(t));

    // push away from the cursor (guarded: normalize(0) is NaN)
    vec2 d = pos.xy - uMouse;
    float len = length(d);
    pos.xy += (d / max(len, 1e-4)) * (1.0 - smoothstep(0.0, 0.35, len)) * 0.25;

    vec3 s = pos + vec3(aRandom - 0.5);
    pos += (s / max(length(s), 1e-4)) * uScatter * 2.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * uPixelRatio;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uScatter;

  void main() {
    if (length(gl_PointCoord - 0.5) > 0.5) discard;
    float a = 1.0 - uScatter;
    gl_FragColor = vec4(uColor * a, a);
  }
`

export async function createParticleHero(canvas, { count, trigger }) {
  const shapes = await Promise.all(SHAPES.map((name) => makeShape(name, count)))

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
  camera.position.z = 1 / Math.tan((FOV / 2) * (Math.PI / 180)) // z=0 plane spans y in [-1, 1]

  // reduced motion holds a still net; otherwise cycle through SHAPES in order
  let shape = reducedMotion ? SHAPES.indexOf('net') : 0
  const from = new BufferAttribute(shapes[shape].slice(), 3).setUsage(DynamicDrawUsage)
  const to = new BufferAttribute(shapes[shape].slice(), 3).setUsage(DynamicDrawUsage)
  const random = new Float32Array(count).map(Math.random)
  const geometry = new BufferGeometry()
  geometry.setAttribute('aFrom', from)
  geometry.setAttribute('aTo', to)
  geometry.setAttribute('aRandom', new BufferAttribute(random, 1))
  geometry.setDrawRange(0, count) // no `position` attribute, so three can't infer the count

  const uniforms = {
    uProgress: { value: 1 },
    uTime: { value: 0 },
    uMouse: { value: new Vector2(10, 10) },
    uScatter: { value: 0 },
    uSize: { value: 2.5 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    // the shader writes this raw (no colorspace chunk), so skip the sRGB -> linear conversion
    uColor: { value: new Color().setStyle(getComputedStyle(canvas).color, LinearSRGBColorSpace) },
  }
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
  })
  const points = new Points(geometry, material)
  points.frustumCulled = false
  scene.add(points)

  const render = () => renderer.render(scene, camera)

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    const aspect = w / h
    renderer.setSize(w, h, false)
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    if (w >= 768) {
      points.position.set(0.35 * aspect, 0, 0)
      points.scale.setScalar(0.75)
    } else {
      points.position.set(0, 0.25, 0)
      points.scale.setScalar(Math.min(0.6, aspect * 0.9))
    }
    if (reducedMotion) render()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  const dispose = () => {
    ro.disconnect()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
  }
  if (reducedMotion) return { destroy: dispose }

  // Morph loop
  const morph = () => {
    shape = (shape + 1) % shapes.length
    from.array.set(to.array)
    to.array.set(shapes[shape])
    from.needsUpdate = to.needsUpdate = true
    gsap.fromTo(uniforms.uProgress, { value: 0 }, { value: 1, duration: 1.6, ease: 'power3.inOut' })
  }
  const timer = gsap.delayedCall(MORPH_EVERY, () => {
    morph()
    timer.restart(true)
  })

  // Pointer: eased toward the cursor, in NDC; (0, 0) tilt and a far-away push when it leaves
  const target = new Vector2()
  const ndc = new Vector2()
  let inside = false
  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const r = canvas.getBoundingClientRect()
    const cl = (n) => Math.max(-1, Math.min(1, n))
    target.set(cl(((e.clientX - r.left) / r.width) * 2 - 1), cl(-((e.clientY - r.top) / r.height) * 2 + 1))
    if (!inside) ndc.copy(target) // don't sweep in from the last exit point
    inside = true
  }
  const onLeave = () => {
    inside = false
    target.set(0, 0)
  }
  window.addEventListener('pointermove', onMove)
  document.documentElement.addEventListener('pointerleave', onLeave)

  const v = new Vector3()
  let last = 0
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.1)
    last = now
    uniforms.uTime.value += dt
    const k = 1 - Math.exp(-dt * 6)
    ndc.lerp(target, k)
    points.rotation.y += (target.x * TILT - points.rotation.y) * k
    points.rotation.x += (-target.y * TILT - points.rotation.x) * k
    if (inside) {
      points.updateMatrixWorld()
      points.worldToLocal(v.set(ndc.x * camera.aspect, ndc.y, 0))
      uniforms.uMouse.value.set(v.x, v.y)
    } else {
      uniforms.uMouse.value.set(10, 10)
    }
    render()
  }

  // Scroll scatter
  const st = ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (s) => (uniforms.uScatter.value = s.progress),
  })
  uniforms.uScatter.value = st.progress

  // Pause while off screen or the tab is hidden
  let onScreen = false
  const updateLoop = () => {
    const run = onScreen && !document.hidden
    if (run) last = performance.now()
    renderer.setAnimationLoop(run ? tick : null)
  }
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting
    updateLoop()
  })
  io.observe(canvas)
  document.addEventListener('visibilitychange', updateLoop)

  return {
    destroy() {
      renderer.setAnimationLoop(null)
      timer.kill()
      gsap.killTweensOf(uniforms.uProgress)
      st.kill()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', updateLoop)
      dispose()
    },
  }
}
