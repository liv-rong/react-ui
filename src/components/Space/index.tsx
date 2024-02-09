import React from 'react'
import { SpaceProps } from './types'
import classNames from 'classnames'
import './style/index.scss'
const Space: React.FC<SpaceProps> = (props) => {
  const {
    className,
    style,
    children,
    size = 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props

  const childNodes = React.Children.toArray(children)
  const mergedAlign =
    direction === 'horizontal' && align === undefined ? 'center' : align
  const cn = classNames(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign
    },
    className
  )

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
      className={cn}
      style={style}
      {...otherProps}
    >
      {nodes}
    </div>
  )
}

export default Space
