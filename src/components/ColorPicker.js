import React from 'react'
import PropTypes from 'prop-types'

import { ColorContext } from './withColor'
import { createColorObject } from '../utils/color'

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func
}

const defaultProps = {
  color: '#FFFFFF',
  onChange: () => {}
}

function ColorPicker(props) {
  const {
    children, color, onChange
  } = props

  return (
    <ColorContext.Provider
      value={{
        color: createColorObject(color),
        onChange
      }}
    >
      {children}
    </ColorContext.Provider>
  )
}

ColorPicker.propTypes = propTypes

ColorPicker.defaultProps = defaultProps

export default ColorPicker
