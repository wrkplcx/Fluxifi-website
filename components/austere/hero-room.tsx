"use client"

import { useEffect, useRef, useState } from "react"

type V = [number, number, number]
type Seg = [V, V]

export const TRADES = ["AV.", "Network.", "Cabling.", "Security."] as const
const LIT_EVENT = "fluxifi:lit-trade"
const AMBER = "#F4A023"
const STEP_MS = 2800

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): Seg[] {
  const c: V[] = [
    [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1],
    [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1],
  ]
  const e = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
  return e.map(([a, b]) => [c[a], c[b]])
}

function loop(points: V[]): Seg[] {
  return points.map((p, i) => [p, points[(i + 1) % points.length]])
}

function path(points: V[]): Seg[] {
  return points.slice(1).map((p, i) => [points[i], p])
}

function ring(cx: number, y: number, cz: number, r: number, n = 16): Seg[] {
  const pts: V[] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    pts.push([cx + Math.cos(a) * r, y, cz + Math.sin(a) * r])
  }
  return loop(pts)
}

const wallX = (x: number, y0: number, y1: number, z0: number, z1: number) =>
  loop([[x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0]])

function buildStructure(): Seg[] {
  const segs: Seg[] = [...box(-4, 0, -3, 4, 3, 3)]
  segs.push(...box(-2, 0.72, -0.7, 2, 0.76, 0.7))
  for (const [x, z] of [[-1.9, -0.6], [1.9, -0.6], [1.9, 0.6], [-1.9, 0.6]]) segs.push([[x, 0, z], [x, 0.72, z]])
  for (const x of [-1.5, -0.75, 0, 0.75, 1.5]) {
    for (const z of [-1.1, 1.1]) {
      segs.push(...box(x - 0.22, 0.42, z - 0.22, x + 0.22, 0.46, z + 0.22))
      const back = z < 0 ? z - 0.22 : z + 0.22
      segs.push([[x - 0.22, 0.46, back], [x - 0.22, 0.95, back]], [[x + 0.22, 0.46, back], [x + 0.22, 0.95, back]], [[x - 0.22, 0.95, back], [x + 0.22, 0.95, back]])
    }
  }
  segs.push(...wallX(4, 0, 2.1, 1.6, 2.5))
  return segs
}

type Device = { trade: number; segs: Seg[] }

function buildDevices(): Device[] {
  const speakers = [[-2, -1.6], [2, -1.6], [-2, 1.6], [2, 1.6]].flatMap(([x, z]) => ring(x, 2.99, z, 0.22))
  const rack: Seg[] = [...box(3.3, 0, -2.9, 3.9, 2, -2.3)]
  for (const y of [0.5, 1, 1.5]) rack.push([[3.3, y, -2.3], [3.9, y, -2.3]])
  const tip: V = [-3.55, 2.6, 2.6]
  const camBase: V[] = [[-3.95, 2.95, 2.85], [-3.95, 2.75, 2.95], [-3.8, 2.75, 2.95], [-3.8, 2.95, 2.85]]
  return [
    { trade: 0, segs: [...wallX(-3.97, 1.1, 2.2, -1.1, 1.1), ...wallX(-3.97, 1.16, 2.14, -1.03, 1.03)] },
    { trade: 1, segs: [...ring(0, 2.99, 0, 0.3), ...ring(0, 2.99, 0, 0.12, 10)] },
    { trade: 2, segs: path([[-3.9, 1.1, 0], [-3.9, 2.9, 0], [-3.9, 2.9, -2.6], [3.6, 2.9, -2.6], [3.6, 2, -2.6]]) },
    { trade: 3, segs: wallX(3.97, 1.1, 1.32, 1.28, 1.42) },
    { trade: 0, segs: speakers },
    { trade: 1, segs: rack },
    { trade: 2, segs: box(-0.2, 0.76, -0.12, 0.2, 0.8, 0.12) },
    { trade: 3, segs: [...loop(camBase), ...camBase.map((p) => [p, tip] as Seg)] },
  ]
}

/** Slowly rotating white wireframe of a meeting room. One device at a time is lit amber. */
export function HeroRoom() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !document.documentElement.classList.contains("motion-ok")) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const structure = buildStructure()
    const devices = buildDevices()
    let width = 0
    let height = 0
    let visible = true
    let raf = 0
    let lastLit = -1
    const start = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      const t = now - start
      const yaw = 0.7 + t * 0.00004
      const pitch = 0.46
      const dist = 13
      const focal = Math.min(width, height) * 1.05
      const cx = width * 0.6
      const cy = height * 0.52
      const cy0 = Math.cos(yaw)
      const sy0 = Math.sin(yaw)
      const cp = Math.cos(pitch)
      const sp = Math.sin(pitch)

      const project = ([x, y, z]: V): [number, number] => {
        const xr = x * cy0 - z * sy0
        const zr = x * sy0 + z * cy0
        const yc = y - 1.5
        const yr = yc * cp - zr * sp
        const zz = yc * sp + zr * cp
        const s = focal / (dist + zz)
        return [cx + xr * s, cy - yr * s]
      }

      const stroke = (segs: Seg[], color: string, lineWidth: number) => {
        ctx.beginPath()
        for (const [a, b] of segs) {
          const [ax, ay] = project(a)
          const [bx, by] = project(b)
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
        }
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      const lit = Math.floor(t / STEP_MS) % devices.length
      const fade = Math.min(1, (t % STEP_MS) / 700)
      if (lit !== lastLit) {
        lastLit = lit
        window.dispatchEvent(new CustomEvent(LIT_EVENT, { detail: devices[lit].trade }))
      }

      ctx.clearRect(0, 0, width, height)
      stroke(structure, "rgba(255,255,255,0.2)", 1)
      devices.forEach((d, i) => {
        if (i !== lit) stroke(d.segs, "rgba(255,255,255,0.5)", 1)
      })
      ctx.globalAlpha = 1 - fade
      stroke(devices[lit].segs, "rgba(255,255,255,0.5)", 1)
      ctx.globalAlpha = fade
      stroke(devices[lit].segs, AMBER, 1.5)
      ctx.globalAlpha = 1

      if (visible) raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="hero-3d h-full w-full" />
}

/** "AV. Network. Cabling. Security." in grey; the word for the lit device turns white. */
export function HeroTrades() {
  const [lit, setLit] = useState(-1)

  useEffect(() => {
    const onLit = (e: Event) => setLit((e as CustomEvent<number>).detail)
    window.addEventListener(LIT_EVENT, onLit)
    return () => window.removeEventListener(LIT_EVENT, onLit)
  }, [])

  return (
    <>
      {TRADES.map((word, i) => (
        <span
          key={word}
          className={`transition-colors duration-700 ease-out ${i === lit ? "text-white" : "text-[#8C8C8C]"}`}
        >
          {word}
          {i < TRADES.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  )
}
