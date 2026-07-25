import { computed } from 'vue'
import { useLogoStore } from './useLogoStore'

const LIGHT = '#f1f5f9'
const DARK = '#0f172a'

/**
 * 所有预览统一的背景来源。
 * - 浅 / 深 / 全(previewMode)→ 取预设浅/深色;全 = 并排两块。
 * - 勾「全局」(globalBg)→ 浅深都 = 头部背景色,并收成单视图(不再并排)。
 * - 在 App.vue 点 浅/深/全 会清掉 globalBg → 回到预设。
 * 文字一律用 textOn(bg) 自适应,任意色都清晰。
 */
export function usePreviewBg() {
  const { state } = useLogoStore()
  const custom = computed(() => state.ui.previewMode === 'custom')
  const color = computed(() => state.ui.backgroundColor)
  const bgLight = computed(() => (custom.value ? color.value : LIGHT))
  const bgDark = computed(() => (custom.value ? color.value : DARK))
  const showLight = computed(() => !custom.value && state.ui.previewMode !== 'dark')
  const showDark = computed(() => custom.value || state.ui.previewMode !== 'light')
  const isBoth = computed(() => !custom.value && state.ui.previewMode === 'both')
  return { custom, color, bgLight, bgDark, showLight, showDark, isBoth }
}
