import React from 'react'
import { SpaceProps } from './types'
const Space: React.FC<SpaceProps> = (props) => {
  const { className, style, ...otherProps } = props

  const childNodes = React.Children.toArray(props.children)

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`

    return (
      <div
        className="space-item"
        key={key}
      >
        {child}
      </div>
    )
  })

  return (
    <div
      className={className}
      style={style}
      {...otherProps}
    >
      {nodes}
    </div>
  )
}

export default Space
