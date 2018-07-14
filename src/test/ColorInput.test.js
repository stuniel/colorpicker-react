import React from 'react'
import { mount, shallow } from 'enzyme'

import ColorInput from '../components/ColorInput'
import { createColorObject } from '../utils/color'

const createShallowWrapper = (props, context) => {
  const outer = shallow(<ColorInput {...props} />)
  const Component = outer.props().children(context)

  return shallow(Component)
}

const createMountWrapper = (props, context) => {
  const outer = shallow(<ColorInput {...props} />)
  const Component = outer.props().children(context)

  return mount(Component)
}

describe('<ColorInput />', () => {
  const context = {
    color: createColorObject('#FFFFFF'),
    onChange: () => {}
  }

  it('renders correctly', () => {
    const wrapper = createShallowWrapper({}, context)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('preview button', () => {
  const context = {
    color: createColorObject('#FFFFFF'),
    onChange: () => {}
  }

  it('renders preview button correctly', () => {
    const wrapper = createMountWrapper({ previewButton: true }, context)
    const button = wrapper.find('button')
    expect(button.props().value).toEqual('#FFFFFF')
    wrapper.unmount()
  })
})
