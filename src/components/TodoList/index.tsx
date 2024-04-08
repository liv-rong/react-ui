import { FC } from 'react'
import { List, NewItem, GarbageBin } from './components'

interface TodoListProps {}

export const TodoList: FC<TodoListProps> = (props) => {
  return (
    <>
      <div className="w-1000 border h-600 m-auto mt-100 p-5 shadow rounded flex justify-between items-center space-x-2">
        <div className="bg-blue-200 w-[70%] h-full rounded overflow-auto">
          <List />
        </div>
        <div className="bg-blue-200 w-[30%] h-full rounded space-y-2 p-2">
          <NewItem />
          <GarbageBin />
        </div>
      </div>
    </>
  )
}
