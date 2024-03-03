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

  return (
    <>
      <div className="space-x-2">
        <IconAdd
          size="40px"
          spin
          style={{ color: 'blue', fontSize: '50px' }}
        />
        {/* <button>{bearStore.bears}</button>
        <br></br>
        <button onClick={() => bearStore.increase()}>+1</button>

        <button onClick={() => bearStore.decrease()}>-1</button>
        <button onClick={() => bearStore.restart()}>重置</button>
        */}
      </div>
      {/* <Calender
        value={dayjs('2023-11-08')}
        className={'aaa'}
        style={{ background: 'yellow' }}
        locale="en-US"
        dateRender={(value) => {
          return (
            <div>
              <p style={{ background: 'yellowgreen', height: '50px' }}>
                {value.format('YYYY/MM/DD')}
              </p>
            </div>
          )
        }}
        onChange={(date) => {
          alert(date.format('YYYY-MM-DD'))
        }}
      ></Calender> */}

      <ColorPickerPanel value="red" />

      <Space
        className="container"
        direction="horizontal"
        align="end"
        wrap={true}
        size={['large', 'small']}
      >
        <div className="h-16 w-16 bg-pink-200"></div>
        <div className="h-16 w-16 bg-pink-200"></div>
        <div className="h-16 w-16 bg-pink-200"></div>
      </Space>
      <ReactSpring />
      <div
        className="container"
        onClick={onClick}
      >
        {transitions((style, i) => {
          const Page = pages[i]
          return <Page style={style} />
        })}
      </div>
    </>
  )
}

export default App
