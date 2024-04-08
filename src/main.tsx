import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../src/assets/style/index.scss'
import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#000000'
          }
        }}
      >
        <StyleProvider hashPriority="high">
          <App />
        </StyleProvider>
      </ConfigProvider>
      {/* <App /> */}
    </React.StrictMode>
  </DndProvider>
)
