<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useLogoStore, selectSlot } from '../composables/useLogoStore'
import { TILES, categoryById, slotsByCategory, slotById, type TileDef } from '../specs/assets'
import type { UploadedFile, PreviewKind } from '../lib/types'
import { downloadBlob } from '../lib/download'
import SlotDetailCard from './SlotDetailCard.vue'
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

interface RenderItem {
  tile: TileDef
  key: string
  forceVariant?: 'light' | 'dark'
}

/** 全模式下,og 分享卡复制成两张整卡对比(各带卡框);其余仍单卡,内部浅深堆叠 */
const renderItems = computed<RenderItem[]>(() => {
  const out: RenderItem[] = []
  for (const tile of TILES) {
    if (tile.preview === 'og-card' && state.ui.previewMode === 'both') {
      out.push({ tile, key: `${tile.id}-light`, forceVariant: 'light' })
      out.push({ tile, key: `${tile.id}-dark`, forceVariant: 'dark' })
    } else {
      out.push({ tile, key: tile.id })
    }
  }
  return out
})

function propsFor(item: RenderItem): Record<string, unknown> {
  const { category, preview } = item.tile
  const base: Record<string, unknown> = { img: lightFile(category) }
  if (['navbar', 'footer', 'browser-tab', 'search-results'].includes(preview)) {
    base.imgDark = darkFile(category)
  }
  if (preview === 'og-card' && item.forceVariant) {
    base.forceVariant = item.forceVariant
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

/** 双击 tile → 全屏预览(只显关联分类的上传槽);◀/▶ 或 ←/→ 切换 */
const fullscreenItem = ref<RenderItem | null>(null)
const fsIndex = computed(() =>
  fullscreenItem.value ? renderItems.value.findIndex((i) => i.key === fullscreenItem.value!.key) : -1,
)
function openFullscreen(item: RenderItem): void {
  fullscreenItem.value = item
}
function stepFullscreen(dir: 1 | -1): void {
  const items = renderItems.value
  const idx = fsIndex.value
  if (idx === -1) return
  fullscreenItem.value = items[(idx + dir + items.length) % items.length]
}
function onKey(e: KeyboardEvent): void {
  if (!fullscreenItem.value) return
  if (e.key === 'Escape') fullscreenItem.value = null
  else if (e.key === 'ArrowRight') stepFullscreen(1)
  else if (e.key === 'ArrowLeft') stepFullscreen(-1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section class="flex min-w-0 flex-1 flex-col">
    <!-- 选中文件信息(仅在有文件时显示) -->
    <div
      v-if="selectedFile"
      class="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line px-4 py-2 text-[11px]"
    >
      <span class="rounded bg-surface-2 px-2 py-0.5 text-ink">{{ selectedSlot.fileName }}</span>
      <span class="text-ink-dim">实际 {{ selectedFile.naturalW || '?' }}×{{ selectedFile.naturalH || '?' }}</span>
      <span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-300">无损</span>
      <button class="ml-auto text-ink-muted hover:text-ink" @click="downloadOriginal">⬇ 原文件</button>
    </div>

    <!-- 宫格:全部场景自适应排列 -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))">
        <div
          v-for="item in renderItems"
          :key="item.key"
          class="cursor-pointer overflow-hidden rounded-xl border transition-all"
          :class="
            isLinked(item.tile.category)
              ? 'border-blue-500 bg-surface/70 ring-2 ring-blue-500/40'
              : 'border-line bg-surface/30 hover:border-line-strong'
          "
          title="单击选中关联 · 双击全屏预览"
          @click="clickTile(item.tile.category)"
          @dblclick="openFullscreen(item)"
        >
          <div class="flex items-center gap-2 border-b border-line/60 px-3 py-2">
            <span class="h-2 w-2 rounded-full" :style="{ background: accentOf(item.tile.category) }"></span>
            <span class="text-xs font-medium text-ink">{{ item.tile.label }}</span>
            <span
              v-if="item.forceVariant"
              class="rounded bg-surface-3 px-1.5 text-[10px] text-ink"
            >{{ item.forceVariant === 'light' ? '浅' : '深' }}</span>
            <span v-if="isLinked(item.tile.category)" class="ml-auto inline-flex items-center gap-1 text-[10px] text-blue-400">
              <span class="h-1.5 w-1.5 rounded-full bg-blue-400"></span>关联
            </span>
            <span v-else-if="hasFile(item.tile.category)" class="ml-auto text-[10px] text-ink-dim">已上传</span>
          </div>

          <div class="p-3">
            <component :is="PREVIEWS[item.tile.preview]" v-bind="propsFor(item)" />
          </div>

          <div class="px-3 pb-2.5 text-[10px] leading-snug text-ink-dim">{{ item.tile.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 全屏预览:主区放大 + 侧栏只显关联分类的上传槽 -->
    <Teleport to="#workspace">
      <div
        v-if="fullscreenItem"
        class="absolute inset-0 z-40 flex gap-4 bg-app/95 p-4 backdrop-blur-sm"
        @click.self="fullscreenItem = null"
      >
        <button
          class="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-surface text-ink hover:bg-surface-2 hover:text-ink"
          title="关闭(Esc)"
          @click="fullscreenItem = null"
        >✕</button>

        <!-- 主预览(放大)+ 左右切换 -->
        <div class="relative flex flex-1 items-center justify-center overflow-auto">
          <button
            class="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-surface text-ink-muted hover:bg-surface-2 hover:text-ink"
            title="上一个(←)"
            @click="stepFullscreen(-1)"
          >◀</button>
          <div class="w-full max-w-3xl rounded-xl border border-line bg-surface/60 p-6">
            <component :is="PREVIEWS[fullscreenItem.tile.preview]" v-bind="propsFor(fullscreenItem)" />
          </div>
          <button
            class="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-surface text-ink-muted hover:bg-surface-2 hover:text-ink"
            title="下一个(→)"
            @click="stepFullscreen(1)"
          >▶</button>
          <div class="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-surface-2/80 px-2.5 py-0.5 text-[10px] text-ink-muted">
            {{ fsIndex + 1 }} / {{ renderItems.length }} · {{ fullscreenItem.tile.label }}
          </div>
        </div>

        <!-- 关联规格:用在哪 / 上传要点 / 详细尺寸 -->
        <aside class="flex w-96 shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-surface/60">
          <div class="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span class="h-3 w-3 rounded-full" :style="{ background: accentOf(fullscreenItem.tile.category) }"></span>
            <span class="text-sm font-semibold text-ink">{{ categoryById(fullscreenItem.tile.category)!.label }}</span>
            <span class="ml-auto rounded bg-surface-2 px-1.5 text-[10px] text-ink-muted">{{ slotsByCategory(fullscreenItem.tile.category).length }} 个尺寸</span>
          </div>
          <div class="flex-1 space-y-3 overflow-y-auto p-3">
            <section>
              <div class="mb-1 text-[10px] font-medium uppercase tracking-wide text-ink-dim">用在哪里</div>
              <p class="text-[11px] leading-relaxed text-ink-muted">{{ categoryById(fullscreenItem.tile.category)!.scenarios }}</p>
            </section>
            <section>
              <div class="mb-1 text-[10px] font-medium uppercase tracking-wide text-ink-dim">上传要点</div>
              <p class="text-[11px] leading-relaxed text-ink-muted">{{ categoryById(fullscreenItem.tile.category)!.uploadHint }}</p>
            </section>
            <section>
              <div class="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-ink-dim">详细尺寸</div>
              <div class="space-y-2">
                <SlotDetailCard v-for="slot in slotsByCategory(fullscreenItem.tile.category)" :key="slot.id" :slot="slot" />
              </div>
            </section>
          </div>
        </aside>
      </div>
    </Teleport>
  </section>
</template>
