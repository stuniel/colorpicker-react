import { hslToHsv, hslToRgb, rgbToHex } from './formatColor'

function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI
}

function getPosition(color, parent) {
  const { hsl: { h, l } } = color
  const { width, height } = parent.getBoundingClientRect()
  const RADIUS = 50 // 50% of parent's width/height
  const radius = width / 2
  const angle = (h - 90) / 360

  const x = Math.cos((angle) * Math.PI * 2)
  const y = Math.sin((angle) * Math.PI * 2)

  let left = ((radius + (radius * x * (1 - l))) / width) * 100
  let top = ((radius + (radius * y * (1 - l))) / height) * 100

  const xLength = left - RADIUS
  const yLength = top - RADIUS

  const alpha = (Math.atan2(yLength, xLength))
  const length = Math.sqrt((Math.abs(xLength)**2) + (Math.abs(yLength)**2))

  if (length > RADIUS) {
    left = (Math.cos(alpha) * RADIUS) + RADIUS
    top = (Math.sin(alpha) * RADIUS) + RADIUS
  }

  left = `${left}%`
  top = `${top}%`

  return { left, top }
}

function getColorFromCoordinates(left, top, x, y, radius) {
  const angle = radiansToDegrees(Math.atan2(y, x)) + 90

  const alpha = (Math.atan2(y, x))
  let length = Math.sqrt(Math.abs(x)**2 + Math.abs(y)**2)

  if (length > radius) {
    left = (Math.cos(alpha) * radius) + radius
    top = (Math.sin(alpha) * radius) + radius
    length = radius
  }

  const hsl = {}
  hsl.h = angle < 0 ? angle + 360 : angle
  hsl.l = 1 - (length / radius)
  hsl.s = 1
  hsl.value = `hsl(${Math.round(hsl.h)}, ${(hsl.s * 100 | 0)}%, ${(hsl.l * 100 | 0)}%)`

  const hsv = hslToHsv(hsl)
  const rgb = hslToRgb(hsl)
  const hex = rgbToHex(rgb)

  return { hex, rgb, hsl, hsv }
}

function getColor(event, color, parent) {
  const rect = parent.getBoundingClientRect()

  let left = (event.targetTouches && event.targetTouches[0].clientX) || event.clientX
  let top = (event.targetTouches && event.targetTouches[0].clientY) || event.clientY

  left -= rect.left
  top -= rect.top

  const radius = rect.width / 2
  const x = left - radius
  const y = top - radius

  return getColorFromCoordinates(left, top, x, y, radius)
}


function getColorFromKeyDown(color, key, parent) {
  let { top, left } = getPosition(color, parent)

  top = parseFloat(top)
  left = parseFloat(left)

  const step = 1

  const stepX = (key === 39 && step) || (key === 37 && -(step)) || 0
  const stepY = (key === 40 && step) || (key === 38 && -(step)) || 0

  const radius = 50
  const x = (left + stepX) - 50
  const y = (top + stepY) - 50

  return getColorFromCoordinates(left, top, x, y, radius)
}

export {
  getPosition,
  getColor,
  getColorFromKeyDown
}
