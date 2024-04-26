import { PropsWithChildren, CSSProperties } from 'react'

export interface WatermarkProps extends PropsWithChildren {
  style?: CSSProperties
  className?: string
  zIndex?: string | number
  width?: number
  height?: number
  rotate?: number
  image?: string
  content?: string | string[]
  fontStyle?: {
    color?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: number | string
  }
  gap?: [number, number] //gap 是两个水印之间的空白距离。
  offset?: [number, number] //offset 是水印相对于 container 容器的偏移量，也就是左上角的空白距离。
  getContainer?: () => HTMLElement
}
