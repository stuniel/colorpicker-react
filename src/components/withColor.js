import React from 'react'
import { createColorObject } from '../utils/color'

export const ColorContext = React.createContext({
  color: createColorObject('#FFFFFF'),
  onChange: () => {}
})

export function withColor(Component) {
  return function ColoredComponent(props) {
    return (
      <ColorContext.Consumer>
        {({ color, onChange }) => <Component {...props} color={color} onChange={onChange} />}
      </ColorContext.Consumer>
    )
  }
}
