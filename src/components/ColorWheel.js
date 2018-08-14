import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getColor, getColorFromKeyDown, getPosition } from '../utils/colorWheel'
import Picker from './Picker'

const propTypes = {
  radius: PropTypes.number,
  style: PropTypes.object // eslint-disable-line react/forbid-prop-types
}
const defaultProps = {
  radius: 300,
  style: {}
}

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.radius};
  height: ${props => props.radius};
`

const Wheel = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${props => props.radius};
  height: ${props => props.radius};
  overflow: hidden;
  
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    left: ${props => `calc(50% - ${props.radius / 2}px)`};
    top: ${props => `calc(50% - ${props.radius / 2}px)`};
    width: ${props => props.radius};
    height: ${props => props.radius};
    background: radial-gradient(rgb(255, 255, 255), rgba(0, 0, 0, 0) 35.35%, rgb(0, 0, 0) 70.71%);
    z-index: 12;
  }
`

const Umbrella = styled.ul`
  border-radius: 50%;
  left: ${props => `calc(50% - ${props.radius / 2}px)`};
  top: ${props => `calc(50% - ${props.radius / 2}px)`};
  width: ${props => props.radius};
  height: ${props => props.radius};
  margin: 0;
  padding: 0;
  position: relative;
  -webkit-filter: ${props => `blur(${props.radius / 10}px)`};
  -webkit-transform: scale(1.35);
`

const Color = styled.li`
  content: "";
  position: absolute;
  border-radius: 50%;
  left: ${props => `calc(50% - ${props.radius / 2}px)`};
  top: ${props => `calc(50% - ${props.radius / 2}px)`};
  width: ${props => props.radius};
  height: ${props => props.radius};
  
  &, &:nth-child(n+19):after {
    clip: ${props => `rect(0, ${props.radius}, ${props.radius}, ${props.radius / 2})`};
  }
  
  &:after, &:nth-child(n+19) {
    content: "";
    position: absolute;
    border-radius: 50%;
    left: ${props => `calc(50% - ${props.radius / 2}px)`};
    top: ${props => `calc(50% - ${props.radius / 2}px)`};
    width: ${props => props.radius};
    height: ${props => props.radius};
    clip: ${props => `rect(0, ${props.radius / 2}, ${props.radius}, 0)`};
  }
  
  &:after {
    background-color: ${props => `hsl(${(props.index) * 10}, 100%, 50%)`};
    transform: ${props => (props.index < 6 ? `rotate(${(props.index + 1) * 10}deg)` : `rotate(${props.index * 10}deg)`)};
    z-index: ${props => (props.index < 18 ? 18 - props.index : 1)};
  }
`

class ColorWheel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.innerRef = React.createRef()
  }

  componentDidMount() {
    if (this.innerRef.current) {
      this.ref = this.innerRef.current
      this.forceUpdate()
    }
  }

  render() {
    const { radius, style } = this.props

    const parts = new Array(36)
      .fill(null)
      .map((_, i) => (<Color
        key={i} // eslint-disable-line react/no-array-index-key
        index={i}
        radius={radius}
      />))


    return (
      <Picker
        innerRef={this.innerRef}
        passedRef={this.ref}
        wrapperComponent={Wrapper}
        style={style}
        getColorFromMouseMove={getColor}
        getColorFromKeyDown={getColorFromKeyDown}
        getPosition={getPosition}
        radius={radius}
        render={() => (
          <Wheel
            radius={radius}
          >
            <Umbrella radius={radius}>
              {parts}
            </Umbrella>
          </Wheel>
        )}
      />
    )
  }
}

ColorWheel.propTypes = propTypes
ColorWheel.defaultProps = defaultProps

export default ColorWheel
