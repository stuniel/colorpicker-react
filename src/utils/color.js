export function getColorValues(color, type) {
  let reg
  switch (type) {
    case 'hex':
      reg = /^(#?)([a-f\d]{3}|[a-f\d]{6})$/i
      break
    case 'rgb':
      reg = /^rgb\( ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d), ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d), ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d) ?\)$/
      break
    case 'hsl':
      reg = /^hsl\( ?(0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d), ?(0|100|\d{1,2})%, ?(0|100|\d{1,2})%\)$/
      break
    case 'r':
    case 'g':
    case 'b':
      reg = /(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)/
      break
    default:
      break
  }

  return reg.exec(color)
}

export function formatHEXValue(hex) {
  const value = hex[2]
  const color = value.length === 3
    ? value[0].repeat(2) + value[1].repeat(2) + value[2].repeat(2)
    : value

  return `#${color.toUpperCase()}`
}

export function formatRGBValue(rgb) {
  const [value, r, g, b] = rgb
  return `rgb(${r}, ${g}, ${b})`
}

export function formatHSLValue(hsl) {
  const [value, h, s, l] = hsl
  return `hsl(${h}, ${s}%, ${l}%)`
}

export function formatRGB(input) {
  const [value, r, g, b] = input
  const rgb = {}
  rgb.r = parseFloat(r)
  rgb.g = parseFloat(g)
  rgb.b = parseFloat(b)
  rgb.value = formatRGBValue(input)

  return { ...rgb }
}

export function formatHSL(input) {
  const [value, h, s, l] = input
  const hsl = {}
  hsl.h = parseFloat(h)
  hsl.s = parseFloat(s / 100)
  hsl.l = parseFloat(l / 100)
  hsl.value = formatHSLValue(input)

  return { ...hsl }
}

export function hexToHSL(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.value)
  let r
  let g
  let b
  r = parseInt(result[1], 16)
  g = parseInt(result[2], 16)
  b = parseInt(result[3], 16)

  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d) + (g < b ? 6 : 0)
        break
      case g:
        h = ((b - r) / d) + 2
        break
      case b:
        h = ((r - g) / d) + 4
        break
      default:
        break
    }
    h /= 6
  }
  const hsl = {}
  hsl.h = Math.ceil(parseFloat(h * 360))
  hsl.s = s
  hsl.l = l
  hsl.value = `hsl(${hsl.h}, ${Math.ceil(parseFloat(s * 100))}%, ${Math.ceil(parseFloat(l * 100))}%)`

  return { ...hsl }
}

export function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.value)

  const rgb = {}
  rgb.r = parseInt(result[1], 16)
  rgb.g = parseInt(result[2], 16)
  rgb.b = parseInt(result[3], 16)
  rgb.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`

  return { ...rgb }
}

export function rgbToHEX(rgb) {
  const { r, g, b } = rgb
  const toHex = (x) => {
    const hex = Math.round(x).toString(16).toUpperCase()
    return hex.length === 1 ? `0${hex}` : hex
  }

  const hex = {}
  hex.value = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return { ...hex }
}

export function hslToRGB(hsl) {
  const { h, s, l } = hsl
  let r
  let g
  let b

  if (s === 0) {
    r = g = b = l
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

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export function hslToHSV(hsl) {
  const { h, s, l } = hsl

  const hsv = {}
  hsv.h = h
  const t = s * ((l < 0.5) ? l : (1 - l))
  hsv.v = l + t
  hsv.s = (l > 0) ? (2 * t) / hsv.v : hsv.s

  return { ...hsv }
}

export function buildColor(value, type, prevColor) {
  let color
  let colorValue
  let hex
  let hsl
  let hsv
  let rgb
  switch (type) {
    case 'hex':
      colorValue = formatHEXValue(value)
      hex = {}
      hex.value = colorValue
      hsl = hexToHSL(hex)
      rgb = hexToRGB(hex)
      hsv = hslToHSV(hsl)
      break
    case 'rgb':
      rgb = formatRGB(value)
      hex = rgbToHEX(rgb)
      hsl = hexToHSL(hex)
      hsv = hslToHSV(hsl)
      break
    case 'hsl':
      hsl = formatHSL(value)
      hsv = hslToHSV(hsl)
      rgb = hslToRGB(hsl)
      hex = rgbToHEX(rgb)
      break
    case 'r':
      color = prevColor
      color.rgb.r = value[1]
      rgb = color.rgb
      hex = rgbToHEX(rgb)
      hsl = hexToHSL(hex)
      hsv = hslToHSV(hsl)
      break
    case 'g':
      color = prevColor
      color.rgb.g = value[1]
      rgb = color.rgb
      hex = rgbToHEX(rgb)
      hsl = hexToHSL(hex)
      hsv = hslToHSV(hsl)
      break
    case 'b':
      color = prevColor
      color.rgb.b = value[1]
      rgb = color.rgb
      hex = rgbToHEX(rgb)
      hsl = hexToHSL(hex)
      hsv = hslToHSV(hsl)
      break
    default:
      break
  }

  return {
    hsl, hsv, hex, rgb
  }
}

function detectColorType(color) {
  let reg

  reg = /^(#?)([a-f\d]{3}|[a-f\d]{6})$/i
  if (reg.test(color)) { return 'hex' }

  reg = /^rgb\( ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d), ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d), ?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d) ?\)$/
  if (reg.test(color)) { return 'rgb' }

  reg = /^hsl\( ?(0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d), ?(0|100|\d{1,2})%, ?(0|100|\d{1,2})%\)$/
  if (reg.test(color)) { return 'hsl' }

  return null
}

export function createColorObject(value) {
  let color = value
  let type = detectColorType(color)

  if (type == null) {
    color = '#FFFFFF'
    type = 'hex'
  }

  const colorValues = getColorValues(color, type)
  return buildColor(colorValues, type)
}

export function formatInputValue(color, type) {
  let value
  let values

  switch (type) {
    case 'hex':
      values = getColorValues(color[type].value, type)
      value = formatHEXValue(values)
      break
    case 'rgb':
      values = getColorValues(color[type].value, type)
      value = formatRGBValue(values)
      break
    case 'r':
      value = color.rgb.r
      break
    case 'g':
      value = color.rgb.g
      break
    case 'b':
      value = color.rgb.b
      break
    default:
      break
  }

  return value
}
