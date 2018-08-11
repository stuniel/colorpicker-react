<div align="center">

<img alt="colorpicker-react logo" src="media/logo.png" height="160">

# colorpicker-react

</div>

## Table of Contents

* [Getting started](#getting-started)
  * [Install](#install)
  * [Import](#import)
  * [Why colorpicker-react?](#why-colorpicker-react)
  * [How to use it?](#how-to-use-it)
* [API](#api)
  * [color](#color)
  * [onChange](#onchange)
* [ColorPicker](#colorpicker)
* [ColorInput](#colorinput)
* [ColorButton](#colorbutton)
* [withColor](#withcolor)

## Getting started

### Install

Using NPM, install `colorpicker-react`, and save it to your package.json dependencies.

```
npm i --save colorpicker-react
```

### Import

Import `ColorPicker` component and any necessary building blocks.

```jsx
import React from 'react'
import { ColorPicker, ColorInput } from 'colorpicker-react'
  
class App extends React.Component {
  render() {
    return (
      <ColorPicker>
        <ColorInput />
      </ColorPicker>
    )
  }
}
```

### Why colorpicker-react?

`colorpicker-react` is a set of modular components that can be used independently to build desired color picker. Additionally you can build your own element, wrap it in `withColor` HOC and use it with components from this library.

### How to use it?

```jsx
import React from 'react'
import { ColorInput, ColorPicker } from 'colorpicker-react'
  
function App (props) {
  return (
    <ColorPicker
      defaultColor="#FFF000"
      onChange={color => props.onChange(color.hex.value)}
    >
      <ColorInput previewButton />
      <div>
        <ColorButton value="#FFF555" />
        <ColorButton value="#456456" />
        <ColorButton value="#FF5555" />
        <ColorButton value="#519951" />
      </div>
    </ColorPicker>
  )
}
```

## API

### `color`
> `object` | defaults to value `'#FFFFFF'`

These are values that represent the color object.

#### hex

| value       |
|:-----------:|
| `'#FF0000'` |

#### rgb

| r    | g   | b   | value              |
|:----:|:---:|:---:|:------------------:|
|`255` | `0` | `0` | `'rgb(255, 0, 0)'` |

#### hsl

|h     | s   | l     | value                 |
|:----:|:---:|:-----:|:---------------------:|
|`0`   | `1` | `0.5` | `'hsl(0, 100%, 50%)'` |

#### hsv

|h    | s   | v   | value                  |
|:---:|:---:|:---:|:----------------------:|
| `0` | `1` | `1` | `'hsv(0, 100%, 100%)'` |

### `onChange`
> `function(color: object)`

`onChange` is called each time the color changes. Called with the color object.

* `color`: This is the color object that is passed from the `ColorPicker` to it's children (see [color](#color))

## `<ColorPicker>`

`ColorPicker` is a wrapper component that uses context to provide `color` and `onChange` to its children. It manages it's own state and returns color values with `onChange` function. 

### `children`
> `node` | required

These are elements that will receive `color` and `onChange` from `ColorPicker` component when wrapped in `withColor` HOC.

### `defaultColor`
> `string` | defaults to `'#FFFFFF'`

`defaultColor` is an optional prop passed do `ColorPicker` component which will initialize the color picker with provided value. It can be also used as a prop which controls components' color value. The value can be either rgb, hex or hsl string value: `rgb(255, 0, 0)`, `#FF0000` or `hsl(0, 100%, 50%)`.

```jsx
import React from 'react'
import { ColorPicker, ColorInput } from 'colorpicker-react'
  
function App (props) {
  return (
    <ColorPicker defaultColor="#FFF000">
      <ColorInput />
    </ColorPicker>
  )
}
```

### `onChange`
> `function(color: object)` | defaults to `function() {}`

Invoked every time the user changes color. (see [onChange](#onChange))

```jsx
import React from 'react'
import { ColorPicker, ColorInput } from 'colorpicker-react'
  
class App extends React.Component {
  state = {
    color: '#FFF000'
  }
  
  handleColorChange = color => {
    this.setState({ color: color.hex.value })
  }
  
  render() {
    return (
      <ColorPicker
        defaultColor={this.state.color}
        onChange={this.handleColorChange}
      >
        <ColorInput />
      </ColorPicker>
    )
  }
}
```

## `<ColorInput>`

### `previewButton`
> `boolean` | defaults to `false`

Used to display a preview button with selected color.

### `style`
> `object` | defaults to `{}`

Styles that are applied to the wrapper.

### `type`
> `string` | defaults to `'hex'`

Type of color model accepted by the input. Accepted one of:
| `'rgb'` | `'hex'` | `'r'` | `'g'` | `'b'` |
|:-------:|:-------:|:-----:|:-----:|:-----:|

## `<ColorButton>`

`ColorButton` is a circular button that allows to store and select color value.

### `value`
> `string` | required

Color value of the button. Accepted value formats:
| hex         | rgb                | hsl                   |
|:-----------:|:------------------:|:---------------------:|
| `'#FF0000'` | `‘rgb(255, 0, 0)’` | `‘hsl(0, 100%, 50%)’` |

### `radius`
> `string` | defaults to `'2em'`

Radius of the button.

### `style`
> `object` | defaults to `{}`

Styles that are applied to the button.

## `withColor`

`withColor` is a higher-order component that will pass updated `color` and `onChange` props to the wrapped component.

```jsx
import React from 'react'
import { ColorInput, ColorPicker } from 'colorpicker-react'
  
class Text extends React.Component {  
  render() {
    const { color } = this.props
  
    return(
      <div>You chose: {color.hex.value}</div>
    )
  }
}
  
const TextWithColor = withColor(Text)
  
function App (props) {
  return (
    <ColorPicker
      defaultColor="#FFF000"
      onChange={color => props.onChange(color.hex.value)}
    >
      <TextWithColor />
      <ColorInput />
    </ColorPicker>
  )
}
```

## LICENSE

MIT
