/**
 * 思路：用canvas把文字或者图片画出来，导入base64的 data url 设置为div 重复背景
 * 整个div覆盖在需要加水印的元素上，设置 point-event:none; 防止鼠标事件触发
 */

import { useRef, PropsWithChildren, CSSProperties, FC, useEffect, useCallback } from 'react'

import { useWatermark } from './hooks'

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

const Watermark: FC<WatermarkProps> = (props) => {
  const {
    style,
    className,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap = [0, 0],
    offset = [0, 0]
  } = props

  const { generateWatermark } = useWatermark(props)

  const containerRef = useRef<HTMLDivElement>(null)

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!
  }, [containerRef.current, props.getContainer])

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer
    })
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer
  ])

  return props.children ? (
    <div
      className={className}
      style={style}
      ref={containerRef}
    >
      {props.children}
    </div>
  ) : null
}

export default Watermark
