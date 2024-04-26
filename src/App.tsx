import React, { useState } from 'react'
import { Link, useLocation, createBrowserRouter, Outlet } from 'react-router-dom'

// import { TodoList } from './components/TodoList'
// import Portal from './components/Portal'
// import MutateObserver from './components/MutationObserver'

import Watermark from './components/Watermark'

import CopyToClipboard from './components/Copy'

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
      <CopyToClipboard
        text={'宋文伟'}
        onCopy={() => {
          console.log('done')
        }}
      >
        <div onClick={() => alert('111')}> 复制</div>
      </CopyToClipboard>
      <h5>TodoList</h5>

      <Watermark content={['测试水印', '神说要有光']}>
        <div style={{ height: 800 }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas
            in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum
            exercitationem esse sapiente? Eveniet, id provident!
          </p>
        </div>
      </Watermark>
    </>
  )
}

export default App
