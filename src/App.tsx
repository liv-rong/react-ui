import React from 'react'
import { UploadOutlined } from '@ant-design/icons'
// import type { UploadProps } from 'antd'
import { Button, message } from 'antd'

import Upload, { UploadProps } from './components/Upload'
// const props: UploadProps = {
//   name: 'file',
//   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   headers: {},
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList)
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`)
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`)
//     }
//   }
// }

const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
}

const App: React.FC = () => (
  <>
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload ant</Button>
    </Upload>

    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload my</Button>
    </Upload>
  </>
)

export default App
