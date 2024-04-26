// function drawImage() {
//   return new Promise<{ width: number; height: number; base64Url: string }>((resolve) => {
//     const img = new Image()
//     img.crossOrigin = 'anonymous'
//     img.referrerPolicy = 'no-referrer'

//     img.src = image
//     img.onload = () => {
//       let { width, height } = options
//       if (!width || !height) {
//         if (width) {
//           height = (img.height / img.width) * +width
//         } else {
//           width = (img.width / img.height) * +height
//         }
//       }
//       configCanvas({ width, height })

//       ctx.drawImage(img, -width / 2, -height / 2, width, height)
//       return resolve({ base64Url: canvas.toDataURL(), width, height })
//     }
//     img.onerror = () => {
//       return drawText()
//     }
//   })
// }
