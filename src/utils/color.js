import { colors } from './formatColor'

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
  type = type || detectColorType(color)
  return colors[type].reg.exec(color)
}

function buildColorFromRgb(rgb) {
  const hex = colors.rgb.hex(rgb)
  const hsl = colors.rgb.hsl(rgb)
  const hsv = colors.hsl.hsv(hsl)

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

function getBasicHue(color) {
  const { hsl: { h } } = color
  const backgroundColor = `hsl(${h}, 100%, 50%)`
  return backgroundColor
}

function hueChanged(prevColor, color) {
  const { hsv: { h } } = color
  const { hsv: { h: prevH } } = prevColor

  return prevH !== h
}

export {
  getColorValues,
  buildColor,
  createColorObject,
  formatInputValue,
  getBasicHue,
  hueChanged
}
