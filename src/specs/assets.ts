import type { PreviewKind } from '../lib/types'

/** 一类上传源 = 左栏一个分组 */
export interface CategoryDef {
  id: string
  label: string
  accent: string
  /** 教学:这组 logo 用在哪里 */
  scenarios: string
  /** 教学:该上传什么 */
  uploadHint: string
  /** 宫格预览时,该分类默认展示哪个槽位的文件(浅色版优先) */
  displaySlot: string
  /** 若支持深色变体:深色版默认展示的槽位(目前仅横版 logo 需要) */
  darkDisplaySlot?: string
}

/** 一个标准文件槽位 = 用户需自行设计并上传的一个尺寸/格式(工具不做派生) */
export interface SlotDef {
  id: string
  /** 标准部署文件名(导出时按此命名) */
  fileName: string
  category: string
  format: 'png' | 'svg' | 'ico'
  /** 期望尺寸,0 = 矢量 / ico(多尺寸) */
  width: number
  height: number
  hint: string
  /** 深浅变体:transparent 单色 logo 才需要分深浅(目前仅横版) */
  variant?: 'light' | 'dark'
}

/** 右栏宫格的一个预览单元。连接到一个分类:选中该分类文件 → 此 tile 高亮并显示该文件 */
export interface TileDef {
  id: string
  label: string
  preview: PreviewKind
  /** 连接的分类 id */
  category: string
  /** 场景说明 */
  desc: string
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'favicon',
    label: '浏览器图标',
    accent: '#3b82f6',
    scenarios: '浏览器标签 · 书签 · 历史 · 搜索结果 · 桌面快捷方式',
    uploadHint: '方形主图标(自带背景,深浅通用);SVG 矢量首选,另备 16/32 PNG + ICO',
    displaySlot: 'favicon-32',
  },
  {
    id: 'ios',
    label: 'iOS 主屏',
    accent: '#22d3ee',
    scenarios: 'iPhone / iPad 主屏 · 搜索 · App Library',
    uploadHint: '方形 ≥180px PNG,不透明背景(透明区会被 iOS 填黑)',
    displaySlot: 'apple-touch',
  },
  {
    id: 'pwa',
    label: 'PWA / 安卓',
    accent: '#34d399',
    scenarios: '安卓桌面 · PWA 安装 · 启动闪屏',
    uploadHint: '方形 192/512 PNG(自带背景,深浅通用);maskable 主体放中心 80%',
    displaySlot: 'android-512',
  },
  {
    id: 'avatar',
    label: '社交头像',
    accent: '#fbbf24',
    scenarios: 'Twitter/X · GitHub · Telegram · 微信公众号(圆/圆角裁切)',
    uploadHint: '方形 ≥512px PNG,主体居中、四周留白(深浅通用)',
    displaySlot: 'avatar-512',
  },
  {
    id: 'nav',
    label: '横版 logo',
    accent: '#10b981',
    scenarios: '导航栏(桌面/移动) · 页脚 · 邮件签名',
    uploadHint: '透明背景单色横版(图标+站名)。深浅背景反差大,建议分别上传浅色版与深色版',
    displaySlot: 'logo-nav-svg',
    darkDisplaySlot: 'logo-nav-dark-svg',
  },
  {
    id: 'og',
    label: '分享卡',
    accent: '#8b5cf6',
    scenarios: 'Twitter · 微信 / TG / IM · Facebook · iMessage',
    uploadHint: '1200×630 PNG,预留 padding,品牌标识 + 一句标语(自带背景,深浅通用)',
    displaySlot: 'og-image',
  },
]

export const SLOTS: SlotDef[] = [
  // favicon(方形主图标,深浅通用)
  { id: 'favicon-svg', fileName: 'favicon.svg', category: 'favicon', format: 'svg', width: 0, height: 0, hint: '矢量,标签页首选' },
  { id: 'favicon-16', fileName: 'favicon-16x16.png', category: 'favicon', format: 'png', width: 16, height: 16, hint: '16px 老浏览器' },
  { id: 'favicon-32', fileName: 'favicon-32x32.png', category: 'favicon', format: 'png', width: 32, height: 32, hint: '32px 标准标签' },
  { id: 'favicon-ico', fileName: 'favicon.ico', category: 'favicon', format: 'ico', width: 0, height: 0, hint: '16/32/48 桌面快捷方式兜底' },
  // ios
  { id: 'apple-touch', fileName: 'apple-touch-icon.png', category: 'ios', format: 'png', width: 180, height: 180, hint: '180px 不透明' },
  // pwa
  { id: 'android-192', fileName: 'android-chrome-192.png', category: 'pwa', format: 'png', width: 192, height: 192, hint: '192px 标准' },
  { id: 'android-512', fileName: 'android-chrome-512.png', category: 'pwa', format: 'png', width: 512, height: 512, hint: '512px 高清 / 闪屏' },
  { id: 'android-512-mask', fileName: 'android-chrome-512-maskable.png', category: 'pwa', format: 'png', width: 512, height: 512, hint: 'maskable,主体在中心 80%' },
  // avatar
  { id: 'avatar-512', fileName: 'avatar-512.png', category: 'avatar', format: 'png', width: 512, height: 512, hint: '512px 主体居中' },
  // nav 横版(浅色版,用于浅色背景)
  { id: 'logo-nav-svg', fileName: 'logo-nav.svg', category: 'nav', format: 'svg', width: 0, height: 0, hint: '浅色版 · 矢量横版', variant: 'light' },
  { id: 'logo-nav-png', fileName: 'logo-nav.png', category: 'nav', format: 'png', width: 480, height: 146, hint: '浅色版 · 480×146', variant: 'light' },
  // nav 横版(深色版,用于深色背景)
  { id: 'logo-nav-dark-svg', fileName: 'logo-nav-dark.svg', category: 'nav', format: 'svg', width: 0, height: 0, hint: '深色版 · 矢量横版', variant: 'dark' },
  { id: 'logo-nav-dark-png', fileName: 'logo-nav-dark.png', category: 'nav', format: 'png', width: 480, height: 146, hint: '深色版 · 480×146', variant: 'dark' },
  // og
  { id: 'og-image', fileName: 'og-image.png', category: 'og', format: 'png', width: 1200, height: 630, hint: '1200×630 分享卡' },
]

/** 右栏宫格预览单元(9 个,覆盖博客 logo 全部使用场景) */
export const TILES: TileDef[] = [
  { id: 't-tab', label: '浏览器标签 / 书签', preview: 'browser-tab', category: 'favicon', desc: '桌面标签 · 书签栏 · 移动地址栏主题色' },
  { id: 't-search', label: '搜索引擎结果', preview: 'search-results', category: 'favicon', desc: 'Google / Bing 结果标题旁的小图标' },
  { id: 't-ios', label: 'iOS 主屏', preview: 'ios-home', category: 'ios', desc: 'iPhone / iPad 主屏 · superellipse 裁切' },
  { id: 't-android', label: '安卓 / PWA 桌面', preview: 'android-desk', category: 'pwa', desc: '多形状裁切 + maskable 安全区' },
  { id: 't-splash', label: 'PWA 启动闪屏', preview: 'pwa-splash', category: 'pwa', desc: '启动时图标 + 背景色(取自 bg)' },
  { id: 't-avatar', label: '社交头像', preview: 'avatar', category: 'avatar', desc: '圆 / 圆角裁切 · Twitter / GitHub / 微信' },
  { id: 't-navbar', label: '导航栏', preview: 'navbar', category: 'nav', desc: '桌面 / 移动 / 吸顶 · 透明横版(深浅两版)' },
  { id: 't-footer', label: '页脚 / 邮件', preview: 'footer', category: 'nav', desc: '页脚 · 邮件签名(复用横版 logo)' },
  { id: 't-og', label: '社交分享卡', preview: 'og-card', category: 'og', desc: 'Twitter / 微信 / TG 链接预览 · 1200×630' },
]

/** manifest 文件名(由 manifest 字段自动生成,非上传) */
export const MANIFEST_FILE = 'site.webmanifest'

export const slotsByCategory = (catId: string): SlotDef[] => SLOTS.filter((s) => s.category === catId)
export const slotById = (id: string): SlotDef | undefined => SLOTS.find((s) => s.id === id)
export const categoryById = (id: string): CategoryDef | undefined => CATEGORIES.find((c) => c.id === id)
