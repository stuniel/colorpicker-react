import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { formatInputValue, getColorValues, buildColor } from '../utils/color'
import withColor from './withColor'

const types = ['hex', 'rgb', 'r', 'g', 'b']

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
  type: PropTypes.oneOf(types)
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
  white-space: nowrap;
  max-height: 100%;
  border: 1px solid #ccc;
  border-radius: ${props => (props.preview ? '0 0.25em 0.25em 0' : '0.5em')};
  outline: none;
  top: 50%;
  right: ${props => (props.preview ? '0' : '0.5em')};
  transform: translateY(-50%);
  transition: 0.4s right cubic-bezier(0.85, 0, 0.15, 1), 0.4s border-radius cubic-bezier(0.85, 0, 0.15, 1), 0.4s height cubic-bezier(0.85, 0, 0.15, 1), 0.4s width cubic-bezier(0.85, 0, 0.15, 1);
  cursor: pointer;
  box-sizing: border-box;
  z-index: 100;
`

class ColorInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      inputValue: formatInputValue(this.props.color, this.props.type),
      preview: false
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { color, type } = this.props

    if (!this.state.focused || (prevProps.color !== color && prevProps.type !== type)) {
      const inputValue = formatInputValue(color, type)
      this.setState({ inputValue }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  onChange(e) {
    const { color: prevColor, onChange, type } = this.props
    const inputValue = e.target.value
    const colorValues = getColorValues(inputValue, type)

    this.setState({ inputValue })

    if (onChange && colorValues != null) {
      const color = buildColor(colorValues, type, prevColor)

      onChange(color)
    }
  }

  onBlur() {
    const { color, type } = this.props
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
    const { color: { hex: { value } }, previewButton, style } = this.props
    const { inputValue, preview } = this.state
    const buttonStyle = { backgroundColor: value }

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
          style={buttonStyle}
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
