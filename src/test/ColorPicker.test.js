import React from 'react'
import { mount, shallow } from 'enzyme'

import ColorPicker from '../components/ColorPicker'
import withColor from '../components/withColor'

const Box = withColor(props => <span {...props} />)

describe('<ColorPicker />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ColorPicker><span /></ColorPicker>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('color', () => {
  it('sets state.color correctly', () => {
    const color = '#FFFFFF'
    const wrapper = mount(<ColorPicker><Box /></ColorPicker>)
    expect(wrapper.state().color.hex.value).toEqual(color)
    wrapper.unmount()
  })

  it('sets state.color correctly when \'defaultColor\' is provided', () => {
    const color = '#123456'
    const wrapper = mount(<ColorPicker defaultColor={color}><Box /></ColorPicker>)
    expect(wrapper.state().color.hex.value).toEqual(color)
    wrapper.unmount()
  })

  it('passes \'#FFFFFF\' as \'defaultColor\' by default', () => {
    const color = '#FFFFFF'
    const wrapper = mount(<ColorPicker><Box /></ColorPicker>)
    const box = wrapper.find('span')
    expect(box.props().color.hex.value).toEqual(color)
  })

  it('passes \'defaultColor\' correctly', () => {
    const color = '#123456'
    const wrapper = mount(<ColorPicker defaultColor={color}><Box /></ColorPicker>)
    const box = wrapper.find('span')
    expect(box.props().color.hex.value).toEqual(color)
    wrapper.unmount()
  })

  it('updates \'defaultColor\' correctly', () => {
    const defaultColor = '#123456'
    const wrapper = mount(<ColorPicker><Box /></ColorPicker>)
    wrapper.setProps({ defaultColor })
    wrapper.update()
    const box = wrapper.find('span')
    expect(box.props().color.hex.value).toEqual(defaultColor)
    wrapper.unmount()
  })

  it('updates \'defaultColor\' correctly when it was previously provided', () => {
    const color = '#654321'
    const defaultColor = '#123456'
    const wrapper = mount(<ColorPicker defaultColor={color}><Box /></ColorPicker>)
    wrapper.setProps({ defaultColor })
    wrapper.update()
    const box = wrapper.find('span')
    expect(box.props().color.hex.value).toEqual(defaultColor)
    wrapper.unmount()
  })
})

describe('onChange', () => {
  it('passes \'onChange\' correctly', () => {
    const onChange = jest.fn()
    const wrapper = mount(<ColorPicker onChange={onChange}><Box /></ColorPicker>)
    const box = wrapper.find('span')
    box.simulate('change')
    expect(onChange).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('sets state.color correctly', () => {
    const color = { hex: { value: '#FF0000' } }
    const onChange = jest.fn().mockImplementation(n => n)
    const wrapper = mount(<ColorPicker onChange={onChange}><Box /></ColorPicker>)
    const box = wrapper.find('span')
    box.props().onChange(color)
    wrapper.update()
    expect(wrapper.state().color).toEqual(color)
    wrapper.unmount()
  })
})
