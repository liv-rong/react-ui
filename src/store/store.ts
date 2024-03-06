// import { create } from 'zustand'
import { create } from './my-store'
interface State {
  bears: number
}
// interface Action {
//   increase: () => void
//   decrease: () => void
//   restart: () => void
// }

export const useBearStore = create((set: any) => ({
  bears: 0,
  increase: () => set((state: State) => ({ bears: state.bears + 1 })),
  decrease: () => set((state: State) => ({ bears: state.bears - 1 })),
  restart: () => set({ bears: 0 })
}))
