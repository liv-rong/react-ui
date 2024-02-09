import {
  useTrail,
  useChain,
  useSprings,
  animated,
  useSpringRef
} from '@react-spring/web'
// useSpringValue：指定单个属性的变化。
// useSpring：指定多个属性的变化
// useSprings：指定多个元素的多个属性的变化，动画并行执行
// useTrial：指定多个元素的多个属性的变化，动画依次执行
// useSpringRef：用来拿到每个动画的 ref，可以用来控制动画的开始、暂停等
// useChain：串行执行多个动画，每个动画可以指定不同的开始时间

const STROKE_WIDTH = 0.5

const MAX_WIDTH = 150
const MAX_HEIGHT = 100

const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50]
]

export default function ReactSpring() {
  const gridApi = useSpringRef()

  const boxApi = useSpringRef()

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT
    }
  })

  const [boxSprings] = useSprings(7, (i) => ({
    ref: boxApi,
    from: {
      scale: 0
    },
    to: {
      scale: 1
    },
    delay: i * 200,
    config: {
      mass: 2,
      tension: 220
    }
  }))

  useChain([gridApi, boxApi], [0, 1], 1500)

  // const width = useSpringValue(0, {
  //   config: {
  //     // duration: 2000
  //     mass: 2,
  //     friction: 10,
  //     tension: 200
  //   }
  // })

  // const [styles, api] = useSpring(() => {
  //   return {
  //     from: {
  //       width: 100,
  //       height: 100
  //     },
  //     config: {
  //       // duration: 2000
  //       mass: 2,
  //       friction: 10,
  //       tension: 400
  //     }
  //   }
  // })

  //在初次渲染的时候执行
  // useEffect(() => {
  //   width.start(800)
  // }, [])

  // function clickHandler() {
  //   api.start({
  //     width: 200,
  //     height: 200
  //   })
  // }

  return (
    <div className="container">
      <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <g>
          {gridSprings.map(({ x2 }, index) => (
            <animated.line
              x1={0}
              y1={index * 10}
              x2={x2}
              y2={index * 10}
              key={index}
              strokeWidth={STROKE_WIDTH}
              stroke="currentColor"
            />
          ))}
          {gridSprings.map(({ y2 }, index) => (
            <animated.line
              x1={index * 10}
              y1={0}
              x2={index * 10}
              y2={y2}
              key={index}
              strokeWidth={STROKE_WIDTH}
              stroke="currentColor"
            />
          ))}
        </g>
        {boxSprings.map(({ scale }, index) => (
          <animated.rect
            key={index}
            width={10}
            height={10}
            fill="currentColor"
            style={{
              transform: `translate(${COORDS[index][0]}px, ${COORDS[index][1]}px)`,
              transformOrigin: `5px 5px`,
              scale
            }}
          />
        ))}
      </svg>
    </div>
  )
}
