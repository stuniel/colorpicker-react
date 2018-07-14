import React from 'react'
import { createColorObject } from '../utils/color'

export const ColorContext = React.createContext({
  color: createColorObject('#FFFFFF'),
  onChange: () => {}
})
