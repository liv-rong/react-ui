import { createContext } from 'react'

export interface FormContextProps {
  values?: Record<string, any>
  setValues?: (values: Record<string, any>) => void //改值
  onValueChange?: (key: string, value: any) => void //onValueChange 监听 value 变化
  // eslint-disable-next-line @typescript-eslint/ban-types
  validateRegister?: (name: string, cb: Function) => void //校验
}

export default createContext<FormContextProps>({})
