import { useEffect, useRef, useState } from 'react'
import { TransformOffset } from '../components/Transform'

type EventType = MouseEvent | React.MouseEvent<Element, MouseEvent>

type EventHandle = (e: EventType) => void

interface useColorDragProps {
  offset?: TransformOffset
  containerRef: React.RefObject<HTMLDivElement>
  targetRef: React.RefObject<HTMLDivElement>
  direction?: 'x' | 'y'
  onDragChange?: (offset: TransformOffset) => void
}

function useColorDrag(
  props: useColorDragProps
): [TransformOffset, EventHandle] {
  const { offset, targetRef, containerRef, direction, onDragChange } = props

  //一个是保存 offset 的
  const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 })

  //一个是保存是否在拖动中的标记的
  const dragRef = useRef({
    flag: false
  })

  //先把之前的事件监听器去掉
  useEffect(() => {
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragStop)
  }, [])

  const updateOffset: EventHandle = (e) => {
    const scrollXOffset =
      document.documentElement.scrollLeft || document.body.scrollLeft
    const scrollYOffset =
      document.documentElement.scrollTop || document.body.scrollTop

    //e.pageX 和 e.pageY 是距离页面顶部和左边的距离
    //减去 scrollLeft 和 scrollTop 之后就是离可视区域顶部和左边的距离了
    const pageX = e.pageX - scrollXOffset
    const pageY = e.pageY - scrollYOffset

    const {
      x: rectX,
      y: rectY,
      width,
      height
    } = containerRef.current!.getBoundingClientRect()

    const { width: targetWidth, height: targetHeight } =
      targetRef.current!.getBoundingClientRect()

    const centerOffsetX = targetWidth / 2
    const centerOffsetY = targetHeight / 2

    const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX
    const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY

    const calcOffset = {
      x: offsetX,
      y: direction === 'x' ? offsetValue.y : offsetY
    }

    setOffsetValue(calcOffset)
    onDragChange?.(calcOffset)
  }

  const onDragStop: EventHandle = (e) => {
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragStop)

    dragRef.current.flag = false
  }

  const onDragMove: EventHandle = (e) => {
    e.preventDefault()
    updateOffset(e)
  }

  const onDragStart: EventHandle = (e) => {
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragStop)

    dragRef.current.flag = true
  }

  return [offsetValue, onDragStart]
}

export default useColorDrag
