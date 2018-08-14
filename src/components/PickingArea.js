import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getBasicHue } from '../utils/color'
import { getPosition, getColor, getColorFromKeyDown } from '../utils/pickingArea'
import Picker from './Picker'

const propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

const defaultProps = {
  height: 300,
  style: {},
  width: 300
}

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};  
`

const Vertical = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));
  user-select: none;
`

const Horizontal = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));
`

class PickingArea extends React.PureComponent {
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
    const { height, style, width } = this.props

    return (
      <Picker
        innerRef={this.innerRef}
        passedRef={this.ref}
        wrapperComponent={Wrapper}
        style={style}
        height={height}
        width={width}
        getColorFromMouseMove={getColor}
        getColorFromKeyDown={getColorFromKeyDown}
        getPosition={getPosition}
        render={({ color }) => (
          <div style={{ backgroundColor: getBasicHue(color) }}>
            <Horizontal>
              <Vertical />
            </Horizontal>
          </div>
        )}
      />
    )
  }
}

PickingArea.propTypes = propTypes

PickingArea.defaultProps = defaultProps

export default PickingArea
