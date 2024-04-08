import classNames from 'classnames'
import { ListItem } from './ListItem'
import { Gap } from './Gap'
import { useTodoListStore } from '../Store.ts'
import { animated, useTransition } from '@react-spring/web'

interface Props {
  className: string | string[]
}

export const List: FC<TodoListProps> = (props: Props) => {
  const cs = classNames('h-[100%] p-2', props.className)

  const todoListStore = useTodoListStore()

  const transition = useTransition(todoListStore.list, {
    from: { transform: 'translate3d(100%,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(-100%,0,0)', opacity: 0 },
    keys: todoListStore.list.map((item) => item.id)
  })

  return (
    <div className={cs}>
      {todoListStore.list.length
        ? transition((style, item) => {
            return (
              <animated.div style={style}>
                <Gap id={item.id} />
                <ListItem data={item} />
              </animated.div>
            )
          })
        : '暂无待办事项'}
      <Gap />
    </div>
  )
}
