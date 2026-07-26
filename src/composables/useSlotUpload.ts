import { ref } from 'vue'
import { fileToUploaded } from '../lib/loadImage'
import { useLogoStore, setFile, selectSlot } from './useLogoStore'
import type { SlotDef } from '../specs/assets'

/** 单个槽位的上传逻辑(左栏 SlotRow 与全屏 SlotDetailCard 共用) */
export function useSlotUpload(slot: SlotDef) {
  const { state } = useLogoStore()
  const error = ref('')

  function isAcceptable(name: string, type: string): boolean {
    const n = name.toLowerCase()
    return type.startsWith('image/') || ['.svg', '.ico', '.png', '.jpg', '.jpeg'].some((ext) => n.endsWith(ext))
  }

  async function pick(file: File | undefined | null): Promise<void> {
    error.value = ''
    if (!file) return
    if (!isAcceptable(file.name, file.type)) {
      error.value = '请选择图片文件(png/svg/ico)'
      return
    }
    try {
      const f = await fileToUploaded(file)
      setFile(slot.id, f)
      selectSlot(slot.id)
    } catch (e) {
      error.value = (e as Error).message
    }
  }

  function onPick(e: Event): void {
    const input = e.target as HTMLInputElement
    pick(input.files?.[0])
    input.value = ''
  }

  function dimLabel(): string {
    if (slot.format === 'svg') return '矢量'
    if (slot.format === 'ico') return '多尺寸'
    return `${slot.width}×${slot.height}`
  }

  return { state, error, onPick, dimLabel, selectSlot }
}
