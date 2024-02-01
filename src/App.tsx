import Calender from './components/calendar'

function App() {
  return (
    <>
      <Calender
        value={new Date('2023-2-21')}
        onChange={(date: Date) => {
          console.log(date, 'date')
        }}
      />
    </>
  )
}

export default App
