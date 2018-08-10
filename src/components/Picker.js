import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import throttle from 'lodash.throttle'

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
  onMouseMove: PropTypes.func,
  onKeyDown: PropTypes.func,
  updatePositon: PropTypes.func,
  wrapperComponent: PropTypes.func
}

const defaultProps = {
  children: null,
  onMouseMove: () => {},
  onKeyDown: () => {},
  updatePositon: () => {},
  wrapperComponent: () => {}
}

class Picker extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      color: props.color,
      pressed: false,
      focused: false
    }
    this.field = React.createRef()

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = throttle(this.handleMouseMove.bind(this), 10)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = throttle(this.handleKeyDown.bind(this), 10)
  }

  componentDidMount() {
    this.rect = this.field.current.getBoundingClientRect()
    this.props.updatePositon(this.props.color, this.rect)

    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate(prevProps, prevState) {
    const { color } = this.props

    if (isEqual(color, prevState.color) || isEqual(color, prevProps.color)) { return }
    this.props.updatePositon(color, this.rect)
  }

  componentWillUnmount() {
    // Unbind listeners
    this.field.current.removeEventListener('mousedown', this.handleMouseDown)
    this.field.current.removeEventListener('touchstart', this.handleMouseDown)
    this.field.current.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleMouseDown(event) {
    event.stopPropagation()
    event.persist()
    this.setState({ pressed: true }, () => {
      this.handleMouseMove(event, this.field.current)

      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('touchmove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    })
  }

  handleMouseMove(event) {
    if (this.state.pressed) {
      const { onMouseMove } = this.props

      let color

      if (onMouseMove) {
        color = onMouseMove(event, this.field.current)
      }

      if (color) {
        this.setState({ color })
      }
    }
  }

  handleMouseUp(event) {
    if (!this.state.pressed) return

    this.setState({ pressed: false })

    this.field.current.removeEventListener('mousedown', this.handleMouseDown)
    this.field.current.removeEventListener('touchstart', this.handleMouseDown)
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

    // Ignore if pointer is not focused
    if (!focused) { return }
    if (focused && key > 36 && key < 41) {
      const { onKeyDown } = this.props

      let color

      if (onKeyDown) {
        color = onKeyDown(key, this.rect)
      }

      if (color) {
        this.setState({ color })
      }
    }
  }

  render() {
    const { children, color, onMouseMove, onKeyDown, updatePositon,
      wrapperComponent: Wrapper, ...passedProps } = this.props

    return (
      <Wrapper
        innerRef={this.field}
        onMouseDown={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
        onTouchStart={this.handleMouseDown}
        {...passedProps}
      >
        {children}
      </Wrapper>
    )
  }
}

Picker.propTypes = propTypes

Picker.defaultProps = defaultProps

export default Picker
