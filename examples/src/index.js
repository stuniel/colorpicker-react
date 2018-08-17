import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import { ColorButton, ColorPicker, ColorInput, ColorWheel, PickingArea, withColor } from '../../src'

const Page = styled.div`
  font-family: 'Open Sans', sans-serif;
  margin: 0 auto;
  max-width: 960px;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 1em;
`

const Wrapper = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  padding: 1em;

  & > * {
    margin: 0.5em 0;
  }
`

const RGB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > * {
    flex-basis: 16.66%;
    text-align: center;
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
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
`

const ColorPreview = withColor(props => (
  <Preview
    color={props.color.hex.value}
    onChange={props.onChange.color}
    style={{ backgroundColor: props.color.hex.value }}
  />
))

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      color: {
        hex: {
          value: '#00D88F'
        }
      }
    }
  }

  render() {
    return (
      <Page>
        <Header>
          <h1 align="center">
            <img alt="colorpicker-react logo" src="media/logo.png" height="160" />
            <br />
            colorpicker-react
          </h1>
        </Header>
        <Content>
          <ColorPicker
            defaultColor={this.state.color.hex.value}
          >
            <Wrapper>
              <PickingArea />
              <ColorInput previewButton />
              <ColorPreview />
              <WrapperButtons>
                <ColorButton value="#00D88F" />
                <ColorButton value="#19647E" />
                <ColorButton value="#E3E7D3" />
                <ColorButton value="#F15025" />
                <ColorButton value="#092327" />
              </WrapperButtons>
            </Wrapper>
          </ColorPicker>
          <ColorPicker
            defaultColor={this.state.color.hex.value}
          >
            <Wrapper>
              <ColorWheel />
              <RGB>
                <strong>R</strong>
                <ColorInput type="r" />
                <strong>G</strong>
                <ColorInput type="g" />
                <strong>B</strong>
                <ColorInput type="b" />
              </RGB>
              <ColorPreview />
              <WrapperButtons>
                <ColorButton value="#00D88F" />
                <ColorButton value="#19647E" />
                <ColorButton value="#E3E7D3" />
                <ColorButton value="#F15025" />
                <ColorButton value="#092327" />
              </WrapperButtons>
            </Wrapper>
          </ColorPicker>
        </Content>
      </Page>
    )
  }
}

render(<App />, document.getElementById('root'))
