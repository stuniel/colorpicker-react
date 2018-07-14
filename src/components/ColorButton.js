import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEqual from 'lodash.isequal'

import { createColorObject } from '../utils/color'
import withColor from './withColor'

const propTypes = {
  color: PropTypes.shape({
    hsl: PropTypes.shape({
      h: PropTypes.number,
      s: PropTypes.number,
      l: PropTypes.number,
      value: PropTypes.string
    }),
    hsv: PropTypes.shape({
      h: PropTypes.number,
      s: PropTypes.number,
      v: PropTypes.number,
      value: PropTypes.string
    }),
    rgb: PropTypes.shape({
      r: PropTypes.number,
      g: PropTypes.number,
      b: PropTypes.number,
      value: PropTypes.string
    }),
    hex: PropTypes.shape({
      value: PropTypes.string
    })
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  radius: PropTypes.string,
  style: PropTypes.object // eslint-disable-line react/forbid-prop-types
}
const defaultProps = {
  radius: '2em',
  style: {}
}

const Button = styled.button`
  width: ${props => props.radius};
  height: ${props => props.radius};
  border: ${props => `3px solid ${props.value}`};
  border-radius: ${props => props.radius};
  background-color: ${props => (props.active ? 'transparent' : props.value)};
  outline: none;
  box-sizing: border-box;
  transition: 0.4s all cubic-bezier(0.85, 0, 0.15, 1);
  cursor: pointer;
`

class ColorButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: isEqual(props.color, createColorObject(props.value))
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color || prevProps.value !== this.props.value) {
      const active = isEqual(this.props.color, createColorObject(this.props.value))
      this.setState({ active }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  handleMouseDown() {
    const { onChange, value } = this.props

    const color = createColorObject(value)

    if (onChange) {
      onChange(color)
    }
  }

  render() {
    const { radius, value, style } = this.props
    const { active } = this.state

    return (
      <Button
        active={active}
        onMouseDown={this.handleMouseDown}
        radius={radius}
        style={style}
        value={value}
      />
    )
  }
}

ColorButton.propTypes = propTypes
ColorButton.defaultProps = defaultProps

export default withColor(ColorButton)
