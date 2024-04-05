import { FC, useRef, ChangeEvent, PropsWithChildren, useState } from 'react'
import axios, { AxiosProgressEvent } from 'axios'
import './index.scss'
import UploadList, { UploadFile } from './UploadList'

export interface UploadProps extends PropsWithChildren {
  action: string // 上传地址
  headers?: Record<string, any> // 设置上传的请求头部
  name?: string // name 是文件的表单字段名
  data?: Record<string, any> //data 是携带的数据
  withCredentials?: boolean
  accept?: string //accept 是 input 接受的文件格式
  multiple?: boolean // multiple 是 input 可以多选
  beforeUpload?: (file: File) => boolean | Promise<File> // 文件上传前的钩子
  onProgress?: (percentage: number, file: File) => void // 文件上传时的钩子
  onSuccess?: (data: any, file: File) => void // 文件上传成功的钩子
  onError?: (err: any, file: File) => void // 文件上传失败的钩子
  onChange?: (file: File) => void // 文件状态改变的钩子
  onRemove?: (file: UploadFile) => void // 文件移除的钩子
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove
  } = props

  const fileInput = useRef<HTMLInputElement>(null)

  const [fileList, setFileList] = useState<Array<UploadFile>>([])

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  // 拿到所有 files 依次上传，之后把 file input 置空
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    const formData = new FormData()

    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: (e: AxiosProgressEvent) => {
          const percentage = Math.round((e.loaded * 100) / e.total!) || 0
          if (percentage < 100) {
            updateFileList(uploadFile, {
              percentage: percentage,
              status: 'uploading'
            })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      })
      .then((resp: { data: any }) => {
        updateFileList(uploadFile, {
          status: 'success',
          response: resp.data
        })
        onSuccess?.(resp.data, file)
        onChange?.(file)
      })
      .catch((err: any) => {
        updateFileList(uploadFile, {
          status: 'error',
          error: err
        })
        onError?.(err, file)
        onChange?.(file)
      })
  }

  return (
    <div className="upload-component">
      <div
        className="upload-input"
        onClick={handleClick}
      >
        {children}
        <input
          className="upload-file-input"
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload
