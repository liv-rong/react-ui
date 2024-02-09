import React from 'react'
import { SizeType } from '../types'

export interface ConfigContextType {
  space?: {
    size?: SizeType
  }
}
export const ConfigContext = React.createContext<ConfigContextType>({})
