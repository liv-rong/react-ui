import React, { forwardRef } from 'react'
import { Icon, IconProps } from '.'

interface CreateIconOptions {
  content: React.ReactNode
  iconProps?: IconProps
  viewBox?: string
}

export function createIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options

  // eslint-disable-next-line react/display-name
  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon
        ref={ref}
        viewBox={viewBox}
        {...iconProps}
        {...props}
      >
        {content}
      </Icon>
    )
  })
}
