import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import { ColorButton, ColorPicker, ColorInput, withColor } from '../../src'

const Wrapper = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  padding: 1em;

  & > * {
    margin: 0.5em 0;
  }
`

const WrapperButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > * {
    margin-right: 1em;
  }
`

const Preview = styled.div`
  background-color: ${props => props.color};
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
`

const ColorPreview = withColor(props => (
  <Preview
    color={props.color.hex.value}
    onChange={props.onChange.color}
  />
))

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      color: {
        hex: {
          value: '#555FFF'
        }
      }
    }
  }

  render() {
    return (
      <ColorPicker
        defaultColor={this.state.color.hex.value}
        onChange={color => this.setState({ color })}
      >
        <Wrapper>
          <ColorInput previewButton />
          <ColorPreview />
          <WrapperButtons>
            <ColorButton value="#FFF555" />
            <ColorButton value="#456456" />
            <ColorButton value="#FF5555" />
            <ColorButton value="#519951" />
          </WrapperButtons>
        </Wrapper>
      </ColorPicker>
    )
  }
}
render(<App />, document.getElementById('root'))
