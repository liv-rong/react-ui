import React, { PropsWithChildren, forwardRef } from 'react'

import cs from 'classnames'

import './index.scss'

type BaseIconProps = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
}

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const getSize = (size: IconProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }
  const width = (size as string) || '1em'
  const height = (size as string) || '1em'
  return [width, height]
}

// eslint-disable-next-line react/display-name
export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, spin, size = '1em', children, ...rest } = props
    const [width, height] = getSize(size)

    const cn = cs('icon', { 'icon-spin': spin }, className)
    return (
      <div>
        <svg
          width={width}
          height={height}
          className={cn}
          ref={ref}
          style={style}
          fill="currentColor"
          {...rest}
        >
          {children}
        </svg>
      </div>
    )
  }
)
