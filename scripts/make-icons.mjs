/**
 * Génère les icônes et l'image de partage, sans dépendance externe.
 *
 * La marque est le mot : « habit » devient « h. » — l'initiale
 * dans la fonte de l'interface, suivie du point « ● », seul signe que la
 * famille « . » possède en propre. L'image de partage porte le mot entier.
 *
 * Les tracés sont figés ci-dessous, relevés le 2026-08-12 dans
 * JetBrainsMonoNerdFont-Regular.ttf (hauteur d'x 14/32).
 *
 * Le dépôt régénère donc ses images sans la fonte et sans paquet :
 *
 *   node scripts/make-icons.mjs
 */

import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const INK = [0x17, 0x18, 0x1a]
const PAPER = [0xf2, 0xf3, 0xf2]

/** Le mark sur la grille 32 : l'initiale, puis le point sur sa ligne de base. */
const MARK_PATH = 'M5.054 25.291L5.054 6.709L7.345 6.709L7.345 13.964L7.371 13.964Q7.549 12.564 8.516 11.8Q9.483 11.036 11.087 11.036Q13.2 11.036 14.447 12.335Q15.694 13.633 15.694 15.873L15.694 25.291L13.403 25.291L13.403 16.255Q13.403 14.676 12.602 13.824Q11.8 12.971 10.425 12.971Q9 12.971 8.173 13.862Q7.345 14.753 7.345 16.382L7.345 25.291L5.054 25.291L5.054 25.291Z'
const MARK_DOT = { cx: 24.858, cy: 23.204, r: 2.087 }

/** Le wordmark : le mot entier, origine à gauche, ligne de base à 0. */
const WORD_PATH = 'M2.342 0L2.342 -18.582L4.633 -18.582L4.633 -11.327L4.658 -11.327Q4.836 -12.727 5.804 -13.491Q6.771 -14.255 8.375 -14.255Q10.487 -14.255 11.735 -12.956Q12.982 -11.658 12.982 -9.418L12.982 0L10.691 0L10.691 -9.036Q10.691 -10.615 9.889 -11.467Q9.087 -12.32 7.713 -12.32Q6.287 -12.32 5.46 -11.429Q4.633 -10.538 4.633 -8.909L4.633 0L2.342 0L2.342 0ZM20.924 0.255Q18.76 0.255 17.487 -0.955Q16.215 -2.164 16.215 -4.124Q16.215 -5.422 16.8 -6.389Q17.385 -7.356 18.429 -7.904Q19.473 -8.451 20.822 -8.451L25.149 -8.451L25.149 -9.545Q25.149 -12.269 22.171 -12.269Q20.847 -12.269 20.033 -11.785Q19.218 -11.302 19.167 -10.436L16.876 -10.436Q17.004 -12.091 18.416 -13.173Q19.829 -14.255 22.171 -14.255Q24.716 -14.255 26.078 -13.033Q27.44 -11.811 27.44 -9.622L27.44 0L25.175 0L25.175 -2.545L25.124 -2.545Q24.92 -1.247 23.825 -0.496Q22.731 0.255 20.924 0.255L20.924 0.255ZM21.484 -1.68Q23.164 -1.68 24.156 -2.495Q25.149 -3.309 25.149 -4.709L25.149 -6.669L21.076 -6.669Q19.956 -6.669 19.256 -5.995Q18.556 -5.32 18.556 -4.2Q18.556 -3.029 19.333 -2.355Q20.109 -1.68 21.484 -1.68L21.484 -1.68ZM37.469 0.255Q35.891 0.255 34.873 -0.522Q33.855 -1.298 33.676 -2.673L33.651 -2.673L33.651 0L31.36 0L31.36 -18.582L33.651 -18.582L33.651 -14.509L33.6 -11.327L33.625 -11.327Q33.829 -12.676 34.86 -13.465Q35.891 -14.255 37.469 -14.255Q39.582 -14.255 40.829 -12.855Q42.076 -11.455 42.076 -9.036L42.076 -4.938Q42.076 -2.545 40.829 -1.145Q39.582 0.255 37.469 0.255L37.469 0.255ZM36.705 -1.731Q38.156 -1.731 38.971 -2.495Q39.785 -3.258 39.785 -4.964L39.785 -9.036Q39.785 -10.767 38.971 -11.518Q38.156 -12.269 36.705 -12.269Q35.305 -12.269 34.478 -11.378Q33.651 -10.487 33.651 -8.909L33.651 -5.091Q33.651 -3.513 34.478 -2.622Q35.305 -1.731 36.705 -1.731L36.705 -1.731ZM45.691 0L45.691 -2.087L50.655 -2.087L50.655 -11.913L46.2 -11.913L46.2 -14L52.945 -14L52.945 -2.087L57.655 -2.087L57.655 0L45.691 0L45.691 0ZM51.545 -16.52Q50.705 -16.52 50.222 -16.953Q49.738 -17.385 49.738 -18.124Q49.738 -18.887 50.222 -19.333Q50.705 -19.778 51.545 -19.778Q52.385 -19.778 52.869 -19.333Q53.353 -18.887 53.353 -18.124Q53.353 -17.385 52.869 -16.953Q52.385 -16.52 51.545 -16.52L51.545 -16.52ZM67.073 0Q65.342 0 64.298 -1.005Q63.255 -2.011 63.255 -3.691L63.255 -11.913L59.233 -11.913L59.233 -14L63.255 -14L63.255 -17.945L65.545 -17.945L65.545 -14L71.273 -14L71.273 -11.913L65.545 -11.913L65.545 -3.691Q65.545 -2.978 65.965 -2.533Q66.385 -2.087 67.073 -2.087L71.145 -2.087L71.145 0L67.073 0L67.073 0Z'
const WORD_DOT = { cx: 80.182, cy: -2.087, r: 2.087 }
const WORD_BOX = { x0: 2.342, y0: -19.778, width: 79.927, height: 20.033 }

/** Icône masquable : le mark tient dans la zone sûre de 80 %. */
const MASKABLE_ZOOM = 0.8

/** Image de partage : le format qu'attendent les aperçus de lien. */
const OG = { width: 1200, height: 630, measure: 0.62 }

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buffer) {
  let c = 0xffffffff
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

/** PNG truecolore 8 bits, sans transparence — l'image est toujours pleine. */
function encodePng(width, height, pixels) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // profondeur
  ihdr[9] = 2 // truecolor
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(pixels, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/** « d » SVG (M/L/Q/Z uniquement) → polygones, courbes aplaties. */
function flatten(d, steps = 24) {
  const tokens = d.match(/[MLQZ][^MLQZ]*/gi) ?? []
  const polygons = []
  let current = null
  let start = null
  let cursor = { x: 0, y: 0 }

  const numbers = (s) => (s.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number)

  for (const token of tokens) {
    const op = token[0].toUpperCase()
    const n = numbers(token.slice(1))

    if (op === 'M') {
      if (current && current.length > 2) polygons.push(current)
      cursor = { x: n[0], y: n[1] }
      start = cursor
      current = [cursor]
    } else if (op === 'L') {
      cursor = { x: n[0], y: n[1] }
      current.push(cursor)
    } else if (op === 'Q') {
      const c = { x: n[0], y: n[1] }
      const to = { x: n[2], y: n[3] }
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        const u = 1 - t
        current.push({
          x: u * u * cursor.x + 2 * u * t * c.x + t * t * to.x,
          y: u * u * cursor.y + 2 * u * t * c.y + t * t * to.y,
        })
      }
      cursor = to
    } else if (op === 'Z') {
      if (current && start) current.push(start)
      if (current && current.length > 2) polygons.push(current)
      current = null
    }
  }
  if (current && current.length > 2) polygons.push(current)
  return polygons
}

/** Cercle → polygone, dans les mêmes coordonnées. */
function circlePolygon({ cx, cy, r }, sides = 160) {
  const points = []
  for (let i = 0; i <= sides; i++) {
    const a = (i / sides) * Math.PI * 2
    points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
  }
  return points
}

/** Met les polygones à l'échelle et les décale — vers des pixels. */
function place(polygons, { scale = 1, dx = 0, dy = 0 }) {
  return polygons.map((poly) => poly.map((p) => ({ x: p.x * scale + dx, y: p.y * scale + dy })))
}

/**
 * Couverture par balayage : remplissage non-zero, 4 sous-lignes par pixel,
 * couverture horizontale exacte. Les polygones sont déjà en pixels.
 */
function coverage(polygons, width, height) {
  const SUB = 4
  const cover = new Float32Array(width * height)

  const edges = []
  for (const poly of polygons) {
    for (let i = 0; i < poly.length - 1; i++) {
      const a = poly[i]
      const b = poly[i + 1]
      if (a.y === b.y) continue
      edges.push({ x0: a.x, y0: a.y, x1: b.x, y1: b.y, winding: b.y > a.y ? 1 : -1 })
    }
  }

  const crossings = []
  for (let sy = 0; sy < height * SUB; sy++) {
    const y = (sy + 0.5) / SUB
    crossings.length = 0

    for (const e of edges) {
      const top = Math.min(e.y0, e.y1)
      const bottom = Math.max(e.y0, e.y1)
      if (y < top || y >= bottom) continue
      const t = (y - e.y0) / (e.y1 - e.y0)
      crossings.push({ x: e.x0 + t * (e.x1 - e.x0), winding: e.winding })
    }
    if (crossings.length < 2) continue

    crossings.sort((a, b) => a.x - b.x)

    const row = Math.floor(sy / SUB) * width
    let winding = 0
    for (let i = 0; i < crossings.length - 1; i++) {
      winding += crossings[i].winding
      if (winding === 0) continue

      let xa = crossings[i].x
      let xb = crossings[i + 1].x
      if (xb <= 0 || xa >= width) continue
      if (xa < 0) xa = 0
      if (xb > width) xb = width

      const first = Math.floor(xa)
      const last = Math.min(Math.ceil(xb) - 1, width - 1)
      for (let px = first; px <= last; px++) {
        const left = Math.max(xa, px)
        const right = Math.min(xb, px + 1)
        if (right > left) cover[row + px] += (right - left) / SUB
      }
    }
  }
  return cover
}

/** Compose le PNG : fond plein, tracé dans la couleur opposée. */
function render(options) {
  const { width, height, polygons, background, foreground } = options
  const cover = coverage(polygons, width, height)
  const stride = width * 3 + 1
  const pixels = Buffer.alloc(stride * height)

  for (let y = 0; y < height; y++) {
    const row = y * stride
    pixels[row] = 0 // filtre « none »
    for (let x = 0; x < width; x++) {
      const alpha = Math.min(1, cover[y * width + x])
      const offset = row + 1 + x * 3
      for (let c = 0; c < 3; c++) {
        pixels[offset + c] = Math.round(
          background[c] + (foreground[c] - background[c]) * alpha,
        )
      }
    }
  }
  return encodePng(width, height, pixels)
}

const markPolygons = [...flatten(MARK_PATH), circlePolygon(MARK_DOT)]
const wordPolygons = [...flatten(WORD_PATH), circlePolygon(WORD_DOT)]

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#17181a"/>
  <path d="${MARK_PATH}" fill="#f2f3f2"/>
  <circle cx="${MARK_DOT.cx}" cy="${MARK_DOT.cy}" r="${MARK_DOT.r}" fill="#f2f3f2"/>
</svg>
`

/** L'icône carrée : la grille 32 portée à la taille demandée. */
function icon(size, zoom = 1) {
  const scale = (size / 32) * zoom
  const shift = (size * (1 - zoom)) / 2
  return render({
    width: size,
    height: size,
    polygons: place(markPolygons, { scale, dx: shift, dy: shift }),
    background: INK,
    foreground: PAPER,
  })
}

/** L'image de partage : le mot, centré, sur toute la surface. */
function share() {
  const scale = (OG.width * OG.measure) / WORD_BOX.width
  return render({
    width: OG.width,
    height: OG.height,
    polygons: place(wordPolygons, {
      scale,
      dx: (OG.width - WORD_BOX.width * scale) / 2 - WORD_BOX.x0 * scale,
      dy: (OG.height - WORD_BOX.height * scale) / 2 - WORD_BOX.y0 * scale,
    }),
    background: INK,
    foreground: PAPER,
  })
}

mkdirSync(OUT, { recursive: true })

const files = [
  ['icon-192.png', icon(192)],
  ['icon-512.png', icon(512)],
  ['icon-maskable-512.png', icon(512, MASKABLE_ZOOM)],
  ['apple-touch-icon.png', icon(180)],
  ['og.png', share()],
  ['favicon.svg', Buffer.from(favicon, 'utf8')],
]

for (const [name, data] of files) {
  writeFileSync(join(OUT, name), data)
  console.log(`${name} — ${data.length} o`)
}
