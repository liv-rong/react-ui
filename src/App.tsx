// import dayjs from 'dayjs'
// import Calender from './components/calendar'
import React, { CSSProperties, FC, useState } from 'react'
import ColorPickerPanel from './components/ColorPickerPanel'
import Space from './components/Space'
import ReactSpring from './components/react-spring'
import { AnimatedProps, animated, useTransition } from '@react-spring/web'

import { createIcon } from '../src/components/icon/createIcon'

const IconAdd = createIcon({
  content: (
    <>
      <path d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"></path>
    </>
  )
})

interface PageItem {
  (props: AnimatedProps<{ style: CSSProperties }>): React.ReactElement
}

const pages: Array<PageItem> = [
  ({ style }) => (
    <animated.div style={{ ...style, background: 'lightpink' }}>A</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: 'lightblue' }}>B</animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: 'lightgreen' }}>
      C
    </animated.div>
  )
]
// import { useBearStore } from './store/store'

function App() {
  const [index, set] = useState(0)
  const onClick = () => set((state) => (state + 1) % 3)

  const transitions = useTransition(index, {
    initial: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(-100%,0,0)' }
  })
  // const bearStore = useBearStore()

  return <></>
}

export default App
