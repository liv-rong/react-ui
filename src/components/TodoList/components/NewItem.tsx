import classNames from 'classnames'
import { useDrag } from 'react-dnd'
import { useRef, useEffect } from 'react'

interface Props {
  className: string | string[]
}

export const NewItem: FC<TodoListProps> = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  /**
   * 返回的对象
   * 第一个参数 表示关联在拖拽过程中的变量 在传入useDrag的规范方法的collect属性中进行映射绑定,    比如：isDraging,canDrag等
   * 第二个参数  代表拖拽元素的ref
   * 第三个返回值 代表拖拽元素拖拽后的预览dom，就是元素被拖拽之后实际的dom
   */

  /**
   * 传入的值
   * 第一个参数 表示关联在拖拽过程中的变量 在传入useDrag的规范方法的collect属性中进行映射绑定,    比如：isDraging,canDrag等
   * 第二个参数  代表拖拽元素的ref
   * 第三个返回值 代表拖拽元素拖拽后的预览dom，就是元素被拖拽之后实际的dom
   */

  const [{ dragging }, drag] = useDrag({
    type: 'new-item',
    item: {
      type: 'new-item'
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging()
      }
    }
  })

  useEffect(() => {
    drag(ref)
  }, [])

  const cs = classNames(
    'h-[100px]  rounded  bg-gray-100',
    'leading-[90px] text-center  text-xl ',
    'cursor-move select-none',
    dragging ? 'border-dashed bg-white' : 'bg-green-300',
    props.className
  )

  return (
    <div
      ref={ref}
      className={cs}
    >
      新的待办事项
    </div>
  )
}
