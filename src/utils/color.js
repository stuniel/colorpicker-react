function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.value)

  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  const value = `rgb(${r}, ${g}, ${b})`

  return { r, g, b, value } // eslint-disable-line object-curly-newline
}

function hslToRgb(hsl) {
  let { h, s, l } = hsl
  let r
  let g
  let b

  h /= 360

  if (s === 0) {
    r = g = b = l // eslint-disable-line no-multi-assign
  } else {
    const hueToRGB = (p, q, t) => {
      if (t < 0) { t += 1 }
      if (t > 1) { t -= 1 }
      if (t < 1 / 6) { return p + ((q - p) * 6 * t) }
      if (t < 1 / 2) { return q }
      if (t < 2 / 3) { return p + ((q - p) * ((2 / 3) - t) * 6) }
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : (l + s) - (l * s)
    const p = (2 * l) - q
    r = hueToRGB(p, q, h + (1 / 3))
    g = hueToRGB(p, q, h)
    b = hueToRGB(p, q, h - (1 / 3))
  }

  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  const value = `rgb(${r}, ${g}, ${b})`

  return { r, g, b, value } // eslint-disable-line object-curly-newline
}

function hslToHsv(hsl) {
  const { h, s, l } = hsl

  const hsv = {}
  hsv.h = h
  const t = s * ((l < 0.5) ? l : (1 - l))
  hsv.v = l + t
  hsv.s = (l > 0) ? (2 * t) / hsv.v : hsv.s

  return { ...hsv }
}

function rgbToHex(rgb) {
  const { r, g, b } = rgb
  const toHex = (x) => {
    const hex = Math.round(x).toString(16).toUpperCase()
    return hex.length === 1 ? `0${hex}` : hex
  }

  const value = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return { value }
}

function rgbToHsl(rgb) {
  let { r, g, b } = rgb
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // eslint-disable-line no-multi-assign
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
      default: h = 0
    }
  }

  h *= 60

  const value = `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`

  return { h, s, l, value } // eslint-disable-line object-curly-newline
}

function rToRGB(r, prevColor) {
  return { prevColor, ...r }
}

function gToRGB(g, prevColor) {
  return { prevColor, ...g }
}

function bToRGB(b, prevColor) {
  return { prevColor, ...b }
}

function formatHexValue(hex) {
  const value = hex[2]
  const color = value.length === 3
    ? value[0].repeat(2) + value[1].repeat(2) + value[2].repeat(2)
    : value

  return `#${color.toUpperCase()}`
}

function formatRgbValue(rgb) {
  const [value, r, g, b] = rgb
  return `rgb(${r}, ${g}, ${b})`
}

function formatHslValue(hsl) {
  const [value, h, s, l] = hsl
  return `hsl(${h}, ${s}%, ${l}%)`
}

function formatHex(input) {
  const hex = {}
  hex.value = formatHexValue(input)

  return { ...hex }
}

function formatRgb(input) {
  const [value, r, g, b] = input
  const rgb = {}
  rgb.r = parseFloat(r)
  rgb.g = parseFloat(g)
  rgb.b = parseFloat(b)
  rgb.value = formatRgbValue(input)

  return { ...rgb }
}

function formatHsl(input) {
  const [value, h, s, l] = input
  const hsl = {}
  hsl.h = parseFloat(h)
  hsl.s = parseFloat(s / 100)
  hsl.l = parseFloat(l / 100)
  hsl.value = formatHslValue(input)

  return { ...hsl }
}

const colors = {
  hex: {
    reg: /^(#?)([a-f\d]{3}|[a-f\d]{6})$/i,
    rgb: hexToRgb,
    value: formatHex
  },
  rgb: {
    reg: /^rgb\( ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d), ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d), ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d) ?\)$/,
    rgb: rgb => rgb,
    hex: rgbToHex,
    hsl: rgbToHsl,
    value: formatRgb
  },
  r: {
    reg: /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
    rgb: rToRGB
  },
  g: {
    reg: /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
    rgb: gToRGB
  },
  b: {
    reg: /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
    rgb: bToRGB
  },
  hsl: {
    reg: /^hsl\( ?(0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d), ?(0|100|\d{1,2})%, ?(0|100|\d{1,2})%\)$/,
    rgb: hslToRgb,
    value: formatHsl
  }
}

function detectColorType(color) {
  let colorType = null

  Object
    .keys(colors)
    .forEach((type) => {
      if (colors[type].reg.test(color)) { colorType = type }
    })

  return colorType
}

function getColorValues(color, type) {
  const colorType = type || detectColorType(color)
  return colors[colorType].reg.exec(color)
}

function buildColorFromRgb(rgb) {
  const hex = rgbToHex(rgb)
  const hsl = rgbToHsl(rgb)
  const hsv = hslToHsv(hsl)

  return {
    rgb, hex, hsl, hsv
  }
}

function buildColor(value, type, prevColor) {
  const values = colors[type].value(value)
  const rgb = colors[type].rgb(values, prevColor)

  return buildColorFromRgb(rgb)
}

function createColorObject(value) {
  let color = value
  let type = detectColorType(color)

  if (type == null) {
    color = '#FFFFFF'
    type = 'hex'
  }

  const colorValues = getColorValues(color)
  return buildColor(colorValues, type)
}

function formatInputValue(color, type) {
  let value
  switch (type) {
    case 'hex':
    case 'rgb':
    case 'hsl':
      value = color[type].value
      break
    case 'r':
    case 'g':
    case 'b':
      value = color.rgb[type]
      break
    default:
      break
  }

  return value
}

export {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  getColorValues,
  formatHexValue,
  formatRgbValue,
  formatHslValue,
  formatRgb,
  formatHsl,
  hslToHsv,
  buildColor,
  createColorObject,
  formatInputValue
}
