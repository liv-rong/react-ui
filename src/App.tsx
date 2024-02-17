// import dayjs from 'dayjs'
// import Calender from './components/calendar'
import React, { FC, useState } from 'react'
import ColorPickerPanel from './components/ColorPickerPanel'
import Space from './components/Space'
import ReactSpring from './components/react-spring'
import { AnimatedProps, animated, useTransition } from '@react-spring/web'

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

function App() {
  const [index, set] = useState(0)
  const onClick = () => set((state) => (state + 1) % 3)

  const transitions = useTransition(index, {
    initial: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(-100%,0,0)' }
  })

  return (
    <>
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
