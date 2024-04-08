import classNames from 'classnames'
import { useRef, useEffect, useState } from 'react'

import { ListItemType, useTodoListStore } from '../Store.ts'
import { useDrag } from 'react-dnd'

interface Props {
  data: ListItemType
}

export const ListItem: FC<TodoListProps> = ({ data }: Props) => {
  const todoListStore = useTodoListStore()

  const ref = useRef<HTMLDivElement>(null)

  const [editing, setEditing] = useState(false)

  const [editContent, setEditContent] = useState(data?.content)

  const [{ dragging }, drag] = useDrag({
    type: 'list-item',
    item: {
      ...data,
      type: 'list-item'
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

  return (
    <div
      ref={ref}
      className={classNames(
        'h-[100px]   p-2 rounded',
        'flex justify-start items-center',
        'text-xl tracking-wide',
        dragging ? ' bg-blue-100 border-dashed' : 'bg-white border-solid'
      )}
      onDoubleClick={() => {
        setEditing(true)
      }}
    >
      <input
        type="checkbox"
        className="w-[30px] h-[30px] mr-2"
        checked={data.status === 'done' ? true : false}
        onChange={(e) => {
          todoListStore.updateItem({
            ...data,
            status: e.target.checked ? 'done' : 'todo'
          })
        }}
      />
      <p>
        {editing ? (
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={() => {
              setEditing(false),
                todoListStore.updateItem({
                  ...data,
                  content: editContent
                })
            }}
          />
        ) : (
          `${data?.id}：${data?.content} `
        )}
      </p>
    </div>
  )
}
