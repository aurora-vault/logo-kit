<script setup lang="ts">
import { ref } from 'vue'
import { fileToUploaded } from '../lib/loadImage'
import { useLogoStore, setFile, selectSlot } from '../composables/useLogoStore'
import { CATEGORIES, slotsByCategory } from '../specs/assets'
import type { SlotDef } from '../specs/assets'

const { state } = useLogoStore()
const errors = ref<Record<string, string>>({})
/** 各分类是否收起(默认全展开) */
const collapsed = ref<Record<string, boolean>>({})

function isAcceptable(name: string, type: string): boolean {
  const n = name.toLowerCase()
  return (
    type.startsWith('image/') ||
    ['.svg', '.ico', '.png', '.jpg', '.jpeg'].some((ext) => n.endsWith(ext))
  )
}

async function pick(slotId: string, file: File | undefined | null): Promise<void> {
  errors.value[slotId] = ''
  if (!file) return
  if (!isAcceptable(file.name, file.type)) {
    errors.value[slotId] = '请选择图片文件(png/svg/ico)'
    return
  }
  try {
    const f = await fileToUploaded(file)
    setFile(slotId, f)
    selectSlot(slotId)
  } catch (e) {
    errors.value[slotId] = (e as Error).message
  }
}

function onPick(slotId: string, e: Event): void {
  const input = e.target as HTMLInputElement
  pick(slotId, input.files?.[0])
  input.value = ''
}

const doneOf = (catId: string) => slotsByCategory(catId).filter((s) => state.files[s.id]).length
const totalOf = (catId: string) => slotsByCategory(catId).length
const toggleCat = (catId: string) => (collapsed.value[catId] = !collapsed.value[catId])

function dimLabel(slot: SlotDef): string {
  if (slot.format === 'svg') return '矢量'
  if (slot.format === 'ico') return '多尺寸'
  return `${slot.width}×${slot.height}`
}
</script>

<template>
  <aside class="flex h-full w-72 shrink-0 flex-col gap-2 overflow-y-auto border-r border-slate-800 bg-slate-950 p-3">
    <p class="px-1 text-[10px] leading-snug text-slate-500">
      逐个上传你的成品(工具不缩放 = 无损)。点击文件选中,右侧关联场景自动高亮。
    </p>

    <div v-for="cat in CATEGORIES" :key="cat.id" class="shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40">
      <!-- 分类头(可展开/收起) -->
      <button
        class="flex w-full items-center gap-2 px-3 py-2 text-left"
        @click="toggleCat(cat.id)"
      >
        <span
          class="text-[10px] text-slate-500 transition-transform"
          :class="collapsed[cat.id] ? '' : 'rotate-90'"
        >▶</span>
        <span class="h-2.5 w-2.5 rounded-full" :style="{ background: cat.accent }"></span>
        <span class="text-xs font-medium text-slate-200">{{ cat.label }}</span>
        <span class="ml-auto rounded bg-slate-800 px-1.5 text-[10px] text-slate-400">
          {{ doneOf(cat.id) }}/{{ totalOf(cat.id) }}
        </span>
      </button>

      <div v-show="!collapsed[cat.id]">
        <p class="px-3 pb-1.5 text-[10px] leading-snug text-slate-500">{{ cat.uploadHint }}</p>

        <div class="space-y-1 p-2 pt-0">
          <template v-for="slot in slotsByCategory(cat.id)" :key="slot.id">
            <div
              class="flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1.5"
              :class="
                state.selectedSlotId === slot.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-transparent hover:border-slate-700 hover:bg-slate-800/50'
              "
              @click="selectSlot(slot.id)"
            >
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-950/60">
                <img
                  v-if="state.files[slot.id]"
                  :src="state.files[slot.id]!.url"
                  class="h-full w-full rounded object-contain"
                  :style="{ imageRendering: slot.width > 0 && slot.width <= 64 ? 'pixelated' : 'auto' }"
                  alt=""
                />
                <span v-else class="text-[9px] uppercase text-slate-600">{{ slot.format }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="truncate text-[11px] text-slate-300">{{ slot.fileName }}</div>
                <div class="text-[10px] text-slate-500">{{ dimLabel(slot) }} · {{ slot.hint }}</div>
              </div>
              <label
                class="shrink-0 cursor-pointer rounded px-1.5 py-0.5 text-[10px] transition-colors"
                :class="
                  state.files[slot.id]
                    ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
                    : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                "
                @click.stop
                @change="onPick(slot.id, $event)"
              >
                {{ state.files[slot.id] ? '换' : '上传' }}
                <input type="file" accept="image/*,.svg,.ico" class="hidden" />
              </label>
            </div>
            <p v-if="errors[slot.id]" class="px-2 pb-1 text-[10px] text-red-400">{{ errors[slot.id] }}</p>
          </template>
        </div>
      </div>
    </div>
  </aside>
</template>
