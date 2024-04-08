import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { useRef, useEffect } from 'react'
import { useTodoListStore } from '../Store.ts'

interface Props {
  className: string | string[]
}
export const GarbageBin: FC<TodoListProps> = (props: Props) => {
  const todoListStore = useTodoListStore()

  const ref = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'list-item',
      drop(item: { id: string }) {
        todoListStore.deleteItem(item.id)
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver()
        }
      }
    }
  })

  useEffect(() => {
    drop(ref)
  }, [])

  const cs = classNames(
    'h-[150px] border-1 rounded border-black ',
    'leading-[100px] text-center  text-xl ',
    isOver ? 'bg-red-200' : 'bg-gray-300',
    props.className
  )

  return (
    <div
      ref={ref}
      className={cs}
    >
      垃圾箱
    </div>
  )
}
