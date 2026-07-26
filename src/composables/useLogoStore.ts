import { reactive } from 'vue'
import type { UploadedFile } from '../lib/types'
import { SLOTS } from '../specs/assets'

export interface LogoUIState {
  brandName: string
  brandShort: string
  themeColor: string
  backgroundColor: string
  liveFavicon: boolean
  /** 全局预览模式:浅 / 深 / 全(并排)/ 色(自定义背景色,= theme+bg) */
  previewMode: 'light' | 'dark' | 'both' | 'custom'
  /** 左栏整体是否收起 */
  sidebarCollapsed: boolean
  /** 界面明暗主题(仅工具外壳风格,与预览浅/深/全/色无关) */
  uiTheme: 'dark' | 'light'
}

interface LogoState {
  /** 每个槽位上传的原始文件(无则 null)。键 = SlotDef.id */
  files: Record<string, UploadedFile | null>
  /** 当前选中的槽位(驱动右侧特色预览) */
  selectedSlotId: string
  /** manifest / 主题元数据 */
  ui: LogoUIState
}

function initFiles(): Record<string, UploadedFile | null> {
  const m: Record<string, UploadedFile | null> = {}
  for (const s of SLOTS) m[s.id] = null
  return m
}

/** 模块级单例状态 */
const state = reactive<LogoState>({
  files: initFiles(),
  selectedSlotId: SLOTS[0].id,
  ui: {
    brandName: 'Shabox',
    brandShort: 'Shabox',
    themeColor: '#0f172a',
    backgroundColor: '#0f172a',
    liveFavicon: false,
    previewMode: 'both',
    sidebarCollapsed: false,
    uiTheme: 'dark',
  },
})

/** 设置某槽位的上传文件,回收上一个 objectURL */
export function setFile(slotId: string, file: UploadedFile | null): void {
  const old = state.files[slotId]
  if (old?.url) {
    try {
      URL.revokeObjectURL(old.url)
    } catch {
      /* ignore */
    }
  }
  state.files[slotId] = file
}

/** 选中某槽位 → 右侧特色预览切到它 */
export function selectSlot(slotId: string): void {
  state.selectedSlotId = slotId
}

export function useLogoStore() {
  return { state, setFile, selectSlot }
}

// HMR 兜底:热更新时回收所有 objectURL
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    for (const s of SLOTS) {
      const f = state.files[s.id]
      if (f?.url) {
        try {
          URL.revokeObjectURL(f.url)
        } catch {
          /* ignore */
        }
      }
    }
  })
}
