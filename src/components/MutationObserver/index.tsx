import React, { useLayoutEffect } from 'react'
import useMutateObserver from './hooks'

interface MutationObserverProps {
  options?: MutationObserverInit
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void
  children: React.ReactElement
}

const MutateObserver: React.FC<MutationObserverProps> = (props) => {
  const { options, onMutate = () => {}, children } = props

  // 创建一个 ref 来保存 DOM 元素
  const elementRef = React.useRef<HTMLElement>(null)

  const [target, setTarget] = React.useState<HTMLElement>()

  useMutateObserver(target!, onMutate, options)

  useLayoutEffect(() => {
    setTarget(elementRef.current!)
  }, [])

  if (!children) {
    return null
  }

  return React.cloneElement(children, { ref: elementRef })
}

export default MutateObserver
