import { useState } from 'react'
import { MessageProps, Position } from '.'

type MessageList = {
  top: MessageProps[]
  bottom: MessageProps[]
}

const initialState = {
  top: [],
  bottom: []
}

function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState
  })

  return {
    messageList,
    add: (messageProps: MessageProps) => {
      const id = getId(messageProps)
    },

    update: (id: number, messageProps: MessageProps) => {},

    remove: (id: number) => {},

    clearAll: () => {}
  }
}

let count = 1
export function getId(messageProps: MessageProps) {
  if (messageProps.id) {
    return messageProps.id
  }
  count += 1
  return count
}

export default useStore
