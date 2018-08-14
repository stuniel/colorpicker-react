import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  top: PropTypes.string,
  left: PropTypes.string
}

const defaultProps = {
  onBlur: () => {},
  onFocus: () => {},
  top: null,
  left: null
}

const Wrapper = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  cursor: pointer;
  z-index: 100;
`
const Element = styled.div`
  position: relative;
  top: -7.5px;
  left: -7.5px;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 10px;
  cursor: pointer;
`

function Pointer(props) {
  const { onBlur, onFocus, left, top } = props

  return (
    <Wrapper style={{ top, left }}>
      <Element
        onBlur={onBlur}
        onFocus={onFocus}
        tabIndex="0"
      />
    </Wrapper>
  )
}

Pointer.propTypes = propTypes

Pointer.defaultProps = defaultProps

export default Pointer
