import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { useRef, useEffect } from 'react'

import { useTodoListStore } from '../Store.ts'

interface Props {
  id?: string
}

export const Gap: FC<TodoListProps> = ({ id }: Props) => {
  const todoListStore = useTodoListStore()

  const ref = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'new-item',
      drop() {
        todoListStore.addItem(
          {
            id: Math.random().toString().slice(2, 8),
            status: 'todo',
            content: '待办事项'
          },
          id
        )
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

  const cs = classNames('h-[20px]', isOver ? 'bg-red-300' : '')

  return (
    <div
      ref={ref}
      className={cs}
    ></div>
  )
}
