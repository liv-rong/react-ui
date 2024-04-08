import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ListItemType {
  id: string
  status: 'todo' | 'done'
  content: string
}

type State = {
  list: ListItemType[]
}

type Action = {
  addItem: (item: ListItemType, id: string) => void
  deleteItem: (id: string) => void
  updateItem: (item: ListItemType) => void
}

const stateCreator: StateCreator<State & Action> = (set) => ({
  list: [],
  addItem: (item: ListItemType, id?: string) => {
    set((state) => {
      if (!id) {
        return {
          list: [...state.list, item]
        }
      }

      const newList = [...state.list]

      const index = newList.findIndex((item) => item.id === id)

      newList.splice(index, 0, item)
      return {
        list: newList
      }
    })
  },
  deleteItem: (id: string) => {
    set((state) => {
      return {
        list: state.list.filter((item) => {
          return item.id !== id
        })
      }
    })
  },
  updateItem: (updateItem: ListItemType) => {
    set((state) => {
      return {
        list: state.list.map((item) => {
          if (item.id === updateItem.id) {
            return updateItem
          }
          return item
        })
      }
    })
  }
})

export const useTodoListStore = create<State & Action>()(
  persist(stateCreator, {
    name: 'todolist'
  })
)
