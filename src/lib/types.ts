/** 右栏宫格预览种类(对应一个场景模拟组件) */
export type PreviewKind =
  | 'browser-tab'
  | 'search-results'
  | 'ios-home'
  | 'android-desk'
  | 'pwa-splash'
  | 'avatar'
  | 'navbar'
  | 'footer'
  | 'og-card'

/**
 * 用户上传的原始文件。工具不做任何派生/缩放 —— 预览仅用 CSS 缩放显示,
 * 导出时原样打包 blob,因此是**无损**的(你上传什么,部署就是什么)。
 */
export interface UploadedFile {
  /** 原始文件 URL(objectURL),供 <img> 显示 / live favicon */
  url: string
  /** 原始 blob,导出时原样写入 zip(无损) */
  blob: Blob
  fileName: string
  naturalW: number
  naturalH: number
  /** MIME,如 image/png / image/svg+xml / image/x-icon */
  format: string
  isSvg: boolean
  svgText: string | null
}
