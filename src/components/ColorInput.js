import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEqual from 'lodash.isequal'

import { formatInputValue, getColorValues, buildColor } from '../utils/color'
import { withColor } from './withColor'

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
  previewButton: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.oneOf(['hex', 'rgb', 'r', 'g', 'b'])
}

const defaultProps = {
  previewButton: false,
  style: {},
  type: 'hex'
}

const Wrapper = styled.div`
display: block;
position: relative;
box-sizing: border-box;
`

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.25em;
  box-sizing: border-box;
  padding: 0.5em;
  outline: none;
  width: 100%;
`

const PreviewButton = styled.button`
  position: absolute;
  width: ${props => (props.preview ? '40%' : '1em')};
  height: ${props => (props.preview ? '100%' : '1em')};
  background-color: ${props => props.value};
  white-space: nowrap;
  max-height: 100%;
  border: 1px solid #ccc;
  border-radius: ${props => (props.preview ? '0 0.25em 0.25em 0' : '0.5em')};
  outline: none;
  top: 50%;
  right: ${props => (props.preview ? '0' : '0.5em')};
  transform: translateY(-50%);
  transition: 0.4s all cubic-bezier(0.85, 0, 0.15, 1);
  cursor: pointer;
  box-sizing: border-box;
  z-index: 100;
`

class ColorInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color,
      focused: false,
      inputValue: formatInputValue(this.props.color, this.props.type),
      preview: false,
      type: this.props.type
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { color, type } = nextProps

    if (prevState.focused || (isEqual(color, prevState.color) && type === prevState.type)) {
      return null
    }

    return {
      color,
      inputValue: formatInputValue(color, type),
      type
    }
  }

  onChange(e) {
    const { onChange, type } = this.props
    const { color: prevColor } = this.state
    const inputValue = e.target.value
    const colorValues = getColorValues(inputValue, type)

    this.setState({ inputValue })

    if (onChange && colorValues != null) {
      const color = buildColor(colorValues, type, prevColor)

      this.setState({ color })
      onChange(color)
    }
  }

  onBlur() {
    const { type } = this.props
    const { color } = this.state
    const inputValue = formatInputValue(color, type)

    this.setState({ inputValue, focused: false })
  }

  onFocus() {
    this.setState({ focused: true })
  }

  togglePreview() {
    this.setState(({ preview }) => ({ preview: !preview }))
  }

  render() {
    const { previewButton, style } = this.props
    const {
      color: { hex: { value } }, inputValue, preview
    } = this.state

    return (
      <Wrapper style={style}>
        <Input
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
          value={inputValue}
        />
        {previewButton && (<PreviewButton
          value={value}
          preview={preview}
          type="button"
          onClick={this.togglePreview}
        />)}
      </Wrapper>
    )
  }
}

ColorInput.propTypes = propTypes

ColorInput.defaultProps = defaultProps

export default withColor(ColorInput)
