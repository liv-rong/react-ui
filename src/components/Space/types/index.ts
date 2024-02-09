export type SizeType = 'small' | 'middle' | 'large' | number | undefined

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
  size?: SizeType | [SizeType, SizeType]
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  split?: React.ReactNode
  wrap?: boolean
}
