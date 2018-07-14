import React from 'react'
import { mount, shallow } from 'enzyme'

import ColorButton from '../components/ColorButton'
import { createColorObject } from '../utils/color'

const createShallowWrapper = (props, context) => {
  const outer = shallow(<ColorButton {...props} />)
  const Component = outer.props().children(context)

  return shallow(Component)
}

const createMountWrapper = (props, context) => {
  const outer = shallow(<ColorButton {...props} />)
  const Component = outer.props().children(context)

  return mount(Component)
}

describe('<ColorButton />', () => {
  const context = {
    color: createColorObject('#FFFFFF'),
    onChange: () => {}
  }

  it('renders correctly', () => {
    const wrapper = createShallowWrapper({ value: '#000000' }, context)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })
})

describe('handleMouseDown', () => {
  it('passes \'onChange\' correctly', () => {
    const onChange = jest.fn()

    const context = {
      color: createColorObject('#FFFFFF'),
      onChange
    }

    const wrapper = createMountWrapper({ value: '#000000' }, context)
    const button = wrapper.find('button')
    button.simulate('mousedown')

    expect(onChange).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
