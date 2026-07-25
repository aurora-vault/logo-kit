/** blob → 文件下载(创建临时 <a download> 点击) */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  // 留足下载启动时间再回收
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export function downloadText(
  text: string,
  fileName: string,
  mime = 'text/plain;charset=utf-8',
): void {
  downloadBlob(new Blob([text], { type: mime }), fileName)
}

export function downloadBytes(
  bytes: Uint8Array,
  fileName: string,
  mime = 'application/octet-stream',
): void {
  downloadBlob(new Blob([bytes], { type: mime }), fileName)
}
