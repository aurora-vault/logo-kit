import type { UploadedFile } from './types'

/** 加载一张图为 HTMLImageElement(取自然尺寸;blob URL 同源不污染) */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片加载失败: ' + src.slice(0, 64)))
    img.src = src
  })
}

/**
 * File → UploadedFile。保留**原始 blob**(导出原样用,无损);
 * 用 objectURL 供显示;SVG 额外保留源码文本。
 */
export async function fileToUploaded(file: File): Promise<UploadedFile> {
  const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')

  let svgText: string | null = null
  if (isSvg) svgText = await file.text()

  const url = URL.createObjectURL(file)
  let naturalW = 0
  let naturalH = 0
  try {
    const img = await loadImage(url)
    naturalW = img.naturalWidth || 0
    naturalH = img.naturalHeight || 0
  } catch {
    /* 取不到尺寸不阻塞(ico 等格式可能失败),尺寸仅作提示 */
  }

  return {
    url,
    blob: file,
    fileName: file.name,
    naturalW,
    naturalH,
    format: file.type || (isSvg ? 'image/svg+xml' : 'application/octet-stream'),
    isSvg,
    svgText,
  }
}
