import React, { PropsWithChildren, forwardRef } from 'react'
type BaseIconProps = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
}

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

// eslint-disable-next-line react/display-name
export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, spin, size = '1em', children, ...rest } = props

    return (
      <div>
        <svg
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
