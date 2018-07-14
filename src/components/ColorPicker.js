import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'

import { ColorContext } from './ColorContext'
import { createColorObject } from '../utils/color'

const propTypes = {
  children: PropTypes.node.isRequired,
  defaultColor: PropTypes.string,
  onChange: PropTypes.func
}

const defaultProps = {
  defaultColor: '#FFFFFF',
  onChange: () => {}
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: createColorObject(this.props.defaultColor)
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultColor !== this.props.defaultColor) {
      const color = createColorObject(this.props.defaultColor)
      this.setState({ color }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  handleChange(color) {
    const { onChange } = this.props

    this.setState({ color })

    if (onChange) {
      onChange(color)
    }
  }

  render() {
    const { children } = this.props

    return (
      <ColorContext.Provider
        value={{
          color: this.state.color,
          onChange: this.handleChange
        }}
      >
        {children}
      </ColorContext.Provider>
    )
  }
}

ColorPicker.propTypes = propTypes

ColorPicker.defaultProps = defaultProps

export default ColorPicker
