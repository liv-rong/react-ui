import { useEffect, useRef, useState } from 'react'
import { WatermarkProps } from '../types'
import { merge } from 'lodash-es'

export type WatermarkOptions = Omit<WatermarkProps, 'className' | 'style' | 'children'>

export function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj
}

const toNumber = (value?: number | string, defaultValue?: number) => {
  if (value === undefined || value === null) return defaultValue

  if (isNumber(value)) return value

  const numberVal = parseFloat(value)

  return isNumber(numberVal) ? numberVal : defaultValue
}

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal'
  },
  getContainer: () => document.body
}

const getMergedOptions = (o: Partial<WatermarkOptions>) => {
  const options = o || {}

  const mergedOptions = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    width: toNumber(options.width, options.image ? defaultOptions.width : undefined),
    height: toNumber(options.height, undefined)!,
    getContainer: options.getContainer!,
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0]),
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1])
    ]
  } as Required<WatermarkOptions>

  const mergedOffsetX = toNumber(mergedOptions.offset?.[0], 0)!
  const mergedOffsetY = toNumber(mergedOptions.offset?.[1] || mergedOptions.offset?.[0], 0)!
  mergedOptions.offset = [mergedOffsetX, mergedOffsetY]

  return mergedOptions
}

const getCanvasData = async (
  options: Required<WatermarkOptions>
): Promise<{ width: number; height: number; base64Url: string }> => {
  const { rotate, image, content, fontStyle, gap } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const ratio = window.devicePixelRatio

  const configCanvas = (size: { width: number; height: number }) => {
    const canvasWidth = gap[0] + size.width
    const canvasHeight = gap[1] + size.height

    canvas.setAttribute('width', `${canvasWidth * ratio}px`)
    canvas.setAttribute('height', `${canvasHeight * ratio}px`)
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2)
    ctx.scale(ratio, ratio)

    const RotateAngle = (rotate * Math.PI) / 180
    ctx.rotate(RotateAngle)
  }

  const drawText = () => {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle
    const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`
    const measureSize = measureTextSize(ctx, [...content], rotate)

    const width = options.width || measureSize.width
    const height = options.height || measureSize.height

    configCanvas({ width, height })

    ctx.fillStyle = color!
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`
    ctx.textBaseline = 'top'
    ;[...content].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } = measureSize.lineSize[index]

      const xStartPoint = -lineWidth / 2
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index

      ctx.fillText(item, xStartPoint, yStartPoint, options.width || measureSize.originWidth)
    })
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width })
  }

  function drawImage() {
    return new Promise<{ width: number; height: number; base64Url: string }>((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'

      img.src = image
      img.onload = () => {
        let { width, height } = options
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * +width
          } else {
            width = (img.width / img.height) * +height
          }
        }
        configCanvas({ width, height })

        ctx.drawImage(img, -width / 2, -height / 2, width, height)
        return resolve({ base64Url: canvas.toDataURL(), width, height })
      }
      img.onerror = () => {
        return drawText()
      }
    })
  }

  return image ? drawImage() : drawText()
}

const measureTextSize = (ctx: CanvasRenderingContext2D, content: string[], rotate: number) => {
  let width = 0
  let height = 0
  const lineSize: Array<{ width: number; height: number }> = []

  content.forEach((item) => {
    const {
      width: textWidth,
      fontBoundingBoxAscent,
      fontBoundingBoxDescent
    } = ctx.measureText(item)

    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent

    if (textWidth > width) {
      width = textWidth
    }

    height += textHeight
    lineSize.push({ height: textHeight, width: textWidth })
  })

  const angle = (rotate * Math.PI) / 180

  return {
    originWidth: width,
    originHeight: height,
    width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
    height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
    lineSize
  }
}

export function useWatermark(params: WatermarkOptions) {
  const [options, setOptions] = useState(params || {})

  const mergedOptions = getMergedOptions(options)
  const watermarkDiv = useRef<HTMLDivElement>()

  const container = mergedOptions.getContainer()
  const { zIndex, gap } = mergedOptions

  function drawWatermark() {
    if (!container) {
      return
    }
    getCanvasData(mergedOptions).then(({ width, height, base64Url }) => {
      const wmStyle = `
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      right:0;
      pointer-events: none;
      z-index:${zIndex};
      background-position: 0 0;
      background-size:${gap[0] + width}px ${gap[1] + height}px;
      background-repeat: repeat;
      background-image:url(${base64Url})`

      if (!watermarkDiv.current) {
        const div = document.createElement('div')
        watermarkDiv.current = div
        container.append(div)
        container.style.position = 'relative'
      }

      watermarkDiv.current?.setAttribute('style', wmStyle.trim())
    })
  }

  useEffect(() => {
    drawWatermark()
  }, [options])

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions))
    },
    destroy: () => {}
  }
}
