// import dayjs from 'dayjs'
// import Calender from './components/calendar'
import ColorPickerPanel from './components/ColorPickerPanel'
import Space from './components/Space'
import ReactSpring from './components/react-spring'
function App() {
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
    </>
  )
}

export default App
