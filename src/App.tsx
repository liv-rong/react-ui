import React, { useEffect, useState } from 'react'
import { Link, useLocation, createBrowserRouter, Outlet } from 'react-router-dom'

// import { TodoList } from './components/TodoList'
// import Portal from './components/Portal'
// import MutateObserver from './components/MutationObserver'

const Layout = () => {
  const { pathname } = useLocation()

  return (
    <div>
      <div>当前路由: {pathname}</div>
      <Outlet />
    </div>
  )
}

const Aaa = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>

      <p>
        <button onClick={() => setCount((count) => count + 1)}>加一</button>
      </p>
      <Link to="/bbb">去 Bbb 页面</Link>
      <br />
      <Link to="/ccc">去 Ccc 页面</Link>
    </div>
  )
}

const Bbb = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <p>
        <button onClick={() => setCount((count) => count + 1)}>加一</button>
      </p>
      <Link to="/">去首页</Link>
    </div>
  )
}

const Ccc = () => {
  return (
    <div>
      <p>ccc</p>
      <Link to="/">去首面</Link>
    </div>
  )
}

const routes = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Aaa></Aaa>
      },
      {
        path: '/bbb',
        element: <Bbb></Bbb>
      },
      {
        path: '/ccc',
        element: <Ccc></Ccc>
      }
    ]
  }
]

export const router = createBrowserRouter(routes)

const App: React.FC = () => {
  // const content = (
  //   <div className="btn">
  //     <button>按钮1111</button>
  //   </div>
  // )

  // const [className, setClassName] = useState('aaa')

  // useEffect(() => {
  //   setTimeout(() => setClassName('bbb'), 2000)
  // }, [])

  // const callback = function (mutationsList: MutationRecord[]) {
  //   console.log(mutationsList)
  // }

  return (
    <>
      <h5>TodoList</h5>
    </>
  )
}

export default App
