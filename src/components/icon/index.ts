import React, { PropsWithChildren, forwardRef } from 'react'
type BaseIconProps = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
}

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, spin, size = '1em', children, ...rest } = props

    return (
      <svg
        ref={ref}
        style={style}
        fill="currentColor"
        {...rest}
      >
        {children}
      </svg>
    )
  }
)
