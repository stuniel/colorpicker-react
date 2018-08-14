import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import throttle from 'lodash.throttle'

import Pointer from './Pointer'
import withColor from './withColor'

const propTypes = {
  children: PropTypes.node,
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
  env: PropTypes.shape({
    addEventListener: PropTypes.func,
    removeEventListener: PropTypes.func
  }),
  onChange: PropTypes.func.isRequired,
  getColorFromMouseMove: PropTypes.func,
  getColorFromKeyDown: PropTypes.func,
  getPosition: PropTypes.func,
  passedRef: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func
  ]),
  render: PropTypes.func,
  wrapperComponent: PropTypes.func
}

const defaultProps = {
  children: null,
  env: typeof window === 'undefined' ? {} : window, // eslint-disable-line no-undef
  getColorFromMouseMove: () => {},
  getColorFromKeyDown: () => {},
  getPosition: () => {},
  passedRef: null,
  render: () => {},
  wrapperComponent: () => {}
}

class Picker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 10)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = throttle(this.handleKeyDown.bind(this), 10)
    this.unbindMouseListeners = this.unbindMouseListeners.bind(this)
  }

  componentWillUnmount() {
    const { env } = this.props

    // Unbind listeners
    env.removeEventListener('keydown', this.handleKeyDown)
    this.unbindMouseListeners()
  }

  handleMouseDown(event) {
    const { color, env } = this.props
    event.stopPropagation()
    event.persist()

    this.handleMouseMove(event, color, this.wrapper)

    env.addEventListener('mousemove', this.handleMouseMove)
    env.addEventListener('touchmove', this.handleMouseMove)
    env.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove(event) {
    const { color: prevColor, onChange, getColorFromMouseMove, passedRef } = this.props

    let color

    if (getColorFromMouseMove && passedRef) {
      color = getColorFromMouseMove(event, prevColor, passedRef)
    }

    if (!color) { return }

    onChange(color)
  }

  handleMouseUp() {
    this.unbindMouseListeners()
  }

  handleBlur() {
    this.setState({ focused: false })
  }

  handleFocus() {
    this.setState({ focused: true })
  }

  handleKeyDown(event) {
    const { focused } = this.state
    const key = event.keyCode || event.which
    const inRange = key > 36 && key < 41

    event.persist()
    // Ignore if pointer is not focused
    if (!focused || !inRange) { return }

    // Prevent arrow keys from scrolling
    event.preventDefault()

    const { color: prevColor, onChange, getColorFromKeyDown, passedRef } = this.props

    let color

    if (getColorFromKeyDown && passedRef) {
      color = getColorFromKeyDown(prevColor, key, passedRef)
    }

    if (!color) { return }

    onChange(color)
  }

  unbindMouseListeners() {
    const { env } = this.props

    env.removeEventListener('mousemove', this.handleMouseMove)
    env.removeEventListener('touchmove', this.handleMouseMove)
    env.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { children, color, getColorFromMouseMove, getColorFromKeyDown, passedRef, render,
      getPosition, wrapperComponent: Wrapper, ...passedProps } = this.props

    let top
    let left

    if (passedRef) {
      ({ top, left } = getPosition(color, passedRef))
    }

    return (
      <Wrapper
        passedRef={passedRef}
        onMouseDown={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
        onTouchStart={this.handleMouseDown}
        {...passedProps}
      >
        {render({ color })}
        <Pointer
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          top={top}
          left={left}
        />
      </Wrapper>
    )
  }
}

Picker.propTypes = propTypes

Picker.defaultProps = defaultProps

export default withColor(Picker)
