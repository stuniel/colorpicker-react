import React from 'react'
import { ColorContext } from './ColorContext'

function withColor(Component) {
  return function ColoredComponent(props) {
    return (
      <ColorContext.Consumer>
        {({ color, onChange }) => <Component {...props} color={color} onChange={onChange} />}
      </ColorContext.Consumer>
    )
  }
}

export default withColor
