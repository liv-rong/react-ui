// 可以监听 dom 的变化，包括子节点的变化、属性的变化
import { useEffect } from 'react'

const defaultOptions: MutationObserverInit = {
  subtree: true, // 监听targer为根节点的树
  childList: true, // 监听targer节点的增加和删除
  attributeFilter: ['style', 'class'] // 节点属性的变化
}

export default function useMutateObserver(
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    if (!nodeOrList) {
      return
    }

    let instance: MutationObserver

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList]

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback)

      nodeList.forEach((element) => {
        instance.observe(element, options)
      })
    }
    return () => {
      //调用 takeRecords 删掉所有剩余通知
      instance?.takeRecords()
      //调用 disconnect 停止接收新的通知
      instance?.disconnect()
    }
  }, [options, nodeOrList])
}
