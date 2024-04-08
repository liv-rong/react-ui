import React, { CSSProperties, useEffect, useState } from 'react'
import { getMaskStyle } from './getMaskStyle'

interface MaskProps {
  element: HTMLElement
  container?: HTMLElement
  renderMaskContent?: (wrapper: React.ReactNode) => React.ReactNode
}

export const Mask: React.FC<MaskProps> = (props) => {
  const { element, container, renderMaskContent } = props
  const [style, setStyle] = useState<CSSProperties>({})

  useEffect(() => {
    if (!element) {
      return
    }

    //设置 block、inline 为 center 是把元素中心滚动到可视区域中心的意思：
    element.scrollIntoView({
      block: 'center',
      inline: 'center'
    })

    const style = getMaskStyle(element, container || document.documentElement)

    setStyle(style)
  }, [element, container])

  const getContent = () => {
    if (!renderMaskContent) {
      return null
    }
    return renderMaskContent(
      <div
        className={'mask-content'}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }

  return (
    <div
      style={style}
      className="mask"
    >
      {getContent()}
    </div>
  )
}
