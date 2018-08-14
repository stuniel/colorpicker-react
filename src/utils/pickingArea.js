import { hslToRgb, rgbToHex } from './color'

function getPosition(color) {
  const { hsv: { s, v } } = color

  const top = `${(1 - v) * 100}%`
  const left = `${s * 100}%`

  return { top, left }
}

function getColorFromHsv(h, s, v) {
  const hsv = {}
  hsv.h = h
  hsv.s = s
  hsv.v = v
  hsv.value = `hsv(${Math.round(hsv.h)}, ${(hsv.s * 100 | 0)}%, ${(hsv.v * 100 | 0)}%)`

  const hsl = {}
  hsl.h = hsv.h
  hsl.l = (2 - hsv.s) * (hsv.v / 2)
  hsl.s = hsl.l < 1
    ? (hsv.s * hsv.v) / (hsl.l < 0.5 ? hsl.l * 2 : 2 - (hsl.l * 2))
    : hsl.s
  hsl.s = Number.isNaN(hsl.s) ? 0 : hsl.s
  hsl.value = `hsl(${Math.round(hsl.h)}, ${(hsl.s * 100 | 0)}%, ${(hsl.l * 100 | 0)}%)`

  const rgb = hslToRgb(hsl)
  const hex = rgbToHex(rgb)

  return { hex, rgb, hsl, hsv }
}

function getColor(event, color, parent) {
  const { hsv: { h } } = color
  const rect = parent.getBoundingClientRect()

  let left = (event.targetTouches && event.targetTouches[0].clientX) || event.clientX
  let top = (event.targetTouches && event.targetTouches[0].clientY) || event.clientY

  left -= rect.left
  top -= rect.top

  left = Math.min(Math.max(left, 0), rect.width)
  top = Math.min(Math.max(top, 0), rect.height)

  const saturation = left / rect.width
  const value = 1 - (top / rect.height)

  return getColorFromHsv(h, saturation, value)
}

function getColorFromKeyDown(color, key) {
  const { hsv: { h, s, v } } = color
  const step = 0.01

  const x = (key === 39 && step) || (key === 37 && -(step)) || 0
  const y = (key === 40 && step) || (key === 38 && -(step)) || 0

  const saturation = Math.min(Math.max((s + x), 0), 1)
  const value = Math.min(Math.max((v - y), 0), 1)

  return getColorFromHsv(h, saturation, value)
}

export {
  getPosition,
  getColor,
  getColorFromKeyDown
}
