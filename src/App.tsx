import dayjs from 'dayjs'
import Calender from './components/calendar'

function App() {
  return (
    <>
      <Calender value={dayjs('2023-2-21')} />
    </>
  )
}

export default App
