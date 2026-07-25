<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore, selectSlot } from '../composables/useLogoStore'
import { TILES, categoryById, slotsByCategory, slotById } from '../specs/assets'
import type { UploadedFile, PreviewKind } from '../lib/types'
import { downloadBlob } from '../lib/download'
import { textOn, isLight } from '../lib/color'
import BrowserTabPreview from './previews/BrowserTabPreview.vue'
import SearchResultsPreview from './previews/SearchResultsPreview.vue'
import IosHomePreview from './previews/IosHomePreview.vue'
import AndroidDeskPreview from './previews/AndroidDeskPreview.vue'
import PwaSplashPreview from './previews/PwaSplashPreview.vue'
import AvatarPreview from './previews/AvatarPreview.vue'
import NavbarPreview from './previews/NavbarPreview.vue'
import FooterPreview from './previews/FooterPreview.vue'
import OgCardPreview from './previews/OgCardPreview.vue'

const { state } = useLogoStore()

const PREVIEWS: Record<PreviewKind, unknown> = {
  'browser-tab': BrowserTabPreview,
  'search-results': SearchResultsPreview,
  'ios-home': IosHomePreview,
  'android-desk': AndroidDeskPreview,
  'pwa-splash': PwaSplashPreview,
  avatar: AvatarPreview,
  navbar: NavbarPreview,
  footer: FooterPreview,
  'og-card': OgCardPreview,
}

const selectedSlot = computed(() => slotById(state.selectedSlotId)!)
const selectedFile = computed(() => state.files[state.selectedSlotId])
const selectedCatId = computed(() => selectedSlot.value.category)

/** 浅色版文件:选中浅色槽时用选中文件,否则分类首选 / 任意已上传浅色 */
function lightFile(catId: string): UploadedFile | null {
  if (catId === selectedCatId.value && selectedSlot.value.variant !== 'dark' && selectedFile.value) {
    return selectedFile.value
  }
  const cat = categoryById(catId)!
  if (state.files[cat.displaySlot]) return state.files[cat.displaySlot]
  const slots = slotsByCategory(catId)
  const light = slots.find((s) => s.variant !== 'dark' && state.files[s.id])
  if (light) return state.files[light.id]
  const any = slots.find((s) => state.files[s.id])
  return any ? state.files[any.id] : null
}

/** 深色版文件:无深色变体的分类 = 浅色版;有则用深色槽,缺则回退浅色 */
function darkFile(catId: string): UploadedFile | null {
  const cat = categoryById(catId)!
  if (!cat.darkDisplaySlot) return lightFile(catId)
  if (catId === selectedCatId.value && selectedSlot.value.variant === 'dark' && selectedFile.value) {
    return selectedFile.value
  }
  if (state.files[cat.darkDisplaySlot]) return state.files[cat.darkDisplaySlot]
  const slots = slotsByCategory(catId)
  const dark = slots.find((s) => s.variant === 'dark' && state.files[s.id])
  if (dark) return state.files[dark.id]
  return lightFile(catId)
}

/** 全局背景模式:按背景亮度取浅/深变体(透明 logo 在反色背景上才可见) */
function globalImg(tile: { category: string }): UploadedFile | null {
  return isLight(state.ui.backgroundColor)
    ? lightFile(tile.category)
    : darkFile(tile.category) || lightFile(tile.category)
}

function propsFor(tile: { category: string; preview: PreviewKind }): Record<string, unknown> {
  const base: Record<string, unknown> = { img: lightFile(tile.category) }
  if (['navbar', 'footer', 'browser-tab', 'search-results'].includes(tile.preview)) {
    base.imgDark = darkFile(tile.category)
  }
  return base
}

const hasFile = (catId: string) => !!(lightFile(catId) || darkFile(catId))
const isLinked = (catId: string) => catId === selectedCatId.value
const accentOf = (catId: string) => categoryById(catId)!.accent

function clickTile(catId: string): void {
  const cat = categoryById(catId)!
  const slots = slotsByCategory(catId)
  const target =
    (state.files[cat.displaySlot] ? cat.displaySlot : '') ||
    slots.find((s) => state.files[s.id])?.id ||
    slots[0].id
  selectSlot(target)
}

function downloadOriginal(): void {
  if (selectedFile.value) downloadBlob(selectedFile.value.blob, selectedSlot.value.fileName)
}
</script>

<template>
  <section class="flex min-w-0 flex-1 flex-col">
    <!-- 顶部:标题 + 选中文件信息 -->
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-slate-800 px-4 py-2 text-[11px]">
      <span class="font-medium text-slate-300">全场景预览</span>
      <span class="text-slate-500">左侧选中的文件,右侧关联场景自动高亮</span>
      <template v-if="selectedFile">
        <span class="ml-auto rounded bg-slate-800 px-2 py-0.5 text-slate-200">{{ selectedSlot.fileName }}</span>
        <span class="text-slate-500">实际 {{ selectedFile.naturalW || '?' }}×{{ selectedFile.naturalH || '?' }}</span>
        <span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-300">无损</span>
        <button class="text-slate-400 hover:text-slate-100" @click="downloadOriginal">⬇ 原文件</button>
      </template>
      <span v-else class="ml-auto text-slate-600">该文件未上传</span>
    </div>

    <!-- 宫格:全部场景自适应排列 -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))">
        <div
          v-for="tile in TILES"
          :key="tile.id"
          class="cursor-pointer overflow-hidden rounded-xl border transition-all"
          :class="
            isLinked(tile.category)
              ? 'border-blue-500 bg-slate-900/70 ring-2 ring-blue-500/40'
              : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
          "
          @click="clickTile(tile.category)"
        >
          <div class="flex items-center gap-2 border-b border-slate-800/60 px-3 py-2">
            <span class="h-2 w-2 rounded-full" :style="{ background: accentOf(tile.category) }"></span>
            <span class="text-xs font-medium text-slate-200">{{ tile.label }}</span>
            <span v-if="isLinked(tile.category)" class="ml-auto inline-flex items-center gap-1 text-[10px] text-blue-300">
              <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>关联
            </span>
            <span v-else-if="hasFile(tile.category)" class="ml-auto text-[10px] text-slate-600">已上传</span>
          </div>

          <div class="p-3">
            <div
              v-if="state.ui.globalBg"
              class="flex items-center justify-center rounded-lg p-4"
              :style="{ background: state.ui.backgroundColor, minHeight: '140px' }"
            >
              <img
                v-if="globalImg(tile)"
                :src="globalImg(tile)!.url"
                class="max-h-28 max-w-full object-contain"
                alt=""
              />
              <span
                v-else
                class="text-[10px] opacity-70"
                :style="{ color: textOn(state.ui.backgroundColor) }"
              >
                未上传
              </span>
            </div>
            <component v-else :is="PREVIEWS[tile.preview]" v-bind="propsFor(tile)" />
          </div>

          <div class="px-3 pb-2.5 text-[10px] leading-snug text-slate-500">{{ tile.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
