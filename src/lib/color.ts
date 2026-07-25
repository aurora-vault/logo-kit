/** 判断 #rrggbb 是否偏亮(用于在背景色上选浅/深 logo 变体、定文字色) */
export function isLight(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return false
  const n = parseInt(m[1], 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

/** 从 #rrggbb 计算合适的前景色(深色背景→白,浅色背景→黑),用于在主题/背景色上叠加文字 */
export function textOn(hex: string): string {
  return isLight(hex) ? '#0f172a' : '#ffffff'
}
