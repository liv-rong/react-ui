import { CSSProperties } from 'react'
// import cs from 'classnames'
// import { Color } from './color'
import { ColorType } from './interface'

export interface ColorPickerProps {
  className?: string
  style?: CSSProperties
  value?: ColorType
  onChange?: (color: ColorType) => void
}

function ColorPickerPanel(props: ColorPickerProps) {
  console.log(props)
  // const { className, style, value, onChange } = props
  // const [colorValue, setColorValue] = useState<Color>(() => {
  //   if (value instanceof Color) {
  //     return value
  //   }
  //   return new Color(value)
  // })

  // const classNames = cs('color-picker', className)

  return (
    <div
    // className={classNames}
    // style={style}
    ></div>
  )
}

export default ColorPickerPanel
