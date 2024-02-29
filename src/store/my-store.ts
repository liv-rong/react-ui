import { useEffect, useState } from 'react'

const createStore = (createState: any) => {
  //state 是全局状态
  let state: any
  //一个集合 用于存储订阅状态变化的监听器
  const listeners: Set<any> = new Set()
  //partial表示要更新的部分状态 而replace表示是否要替换整个状态。
  const setState = (partial: any, replace: any) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial

    // 比较严格相等
    if (!Object.is(nextState, state)) {
      const previousState = state

      if (!replace) {
        state =
          typeof nextState !== 'object' || nextState === null
            ? nextState
            : Object.assign({}, state, nextState)
      } else {
        state = nextState
      }
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const getState = () => state

  const subscribe = (listener: any) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const destroy = () => {
    listeners.clear()
  }

  const api = { setState, getState, subscribe, destroy }

  state = createState(setState, getState, api)

  return api
}

function useStore(api: any, selector: any) {
  const [, forceRender] = useState(0)
  useEffect(() => {
    api.subscribe((state: any, prevState: any) => {
      const newObj = selector(state)
      const oldobj = selector(prevState)

      if (newObj !== oldobj) {
        forceRender(Math.random())
      }
    })
  }, [])
  return selector(api.getState())
}

export const create = (createState: any) => {
  const api = createStore(createState)

  const useBoundStore = (selector: any) => useStore(api, selector)

  Object.assign(useBoundStore, api)

  return useBoundStore
}
