export interface ZipFile {
  name: string
  blob: Blob
}

/** 用 JSZip 打包多文件为单个 zip Blob(动态 import 减首屏) */
export async function buildLogoPack(files: ZipFile[]): Promise<Blob> {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()
  for (const f of files) {
    zip.file(f.name, f.blob)
  }
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
}
