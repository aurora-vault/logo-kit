<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

const props = withDefaults(defineProps<{ img: UploadedFile | null; imgDark?: UploadedFile | null }>(), { imgDark: null })
const { state } = useLogoStore()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
const darkLogo = computed(() => props.imgDark || props.img)
const wrapBg = computed(() => (state.ui.previewMode === 'custom' ? state.ui.backgroundColor : state.ui.previewMode === 'light' ? bgLight.value : bgDark.value))
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-ink-muted">桌面标签 + 书签栏</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showLight">
        <div class="flex items-end rounded-t-lg border-x border-t border-black/10 p-2" :style="{ background: bgLight }">
          <div class="inline-flex items-center gap-1.5 rounded-t-md bg-white/70 px-2 py-1.5 shadow-sm" :style="{ color: textOn(bgLight) }">
            <img v-if="img" :src="img.url" class="h-4 w-4" style="image-rendering: pixelated" alt="fav" />
            <span v-else class="h-4 w-4 rounded-sm border border-dashed border-slate-400"></span>
            <span class="truncate text-[11px]">{{ state.ui.brandName }}</span>
            <span class="text-[11px] opacity-40">×</span>
          </div>
        </div>
        <div class="flex items-center gap-2 border-x border-b border-black/10 bg-white/40 px-3 py-1.5" :style="{ color: textOn(bgLight) }">
          <span class="text-[10px]">🔒</span><span class="text-[11px]">shabox.fun</span>
        </div>
        <div class="flex items-center gap-2 rounded-b-lg border-x border-b border-black/10 bg-white/20 px-3 py-1.5" :style="{ color: textOn(bgLight) }">
          <span class="inline-flex items-center gap-1 text-[11px]">
            <img v-if="img" :src="img.url" class="h-3.5 w-3.5" style="image-rendering: pixelated" alt="" />
            <span v-else class="h-3.5 w-3.5 rounded-sm border border-dashed border-slate-400"></span>
            {{ state.ui.brandShort }}
          </span>
          <span class="text-[11px] opacity-50">☆</span>
        </div>
      </div>
      <div v-if="showDark">
        <div class="flex items-end rounded-t-lg border-x border-t border-white/10 p-2" :style="{ background: bgDark }">
          <div class="inline-flex items-center gap-1.5 rounded-t-md bg-white/10 px-2 py-1.5" :style="{ color: textOn(bgDark) }">
            <img v-if="darkLogo" :src="darkLogo.url" class="h-4 w-4" style="image-rendering: pixelated" alt="fav" />
            <span v-else class="h-4 w-4 rounded-sm border border-dashed border-slate-500"></span>
            <span class="truncate text-[11px]">{{ state.ui.brandName }}</span>
            <span class="text-[11px] opacity-40">×</span>
          </div>
        </div>
        <div class="flex items-center gap-2 border-x border-b border-white/10 bg-white/5 px-3 py-1.5" :style="{ color: textOn(bgDark) }">
          <span class="text-[10px]">🔒</span><span class="text-[11px]">shabox.fun</span>
        </div>
        <div class="flex items-center gap-2 rounded-b-lg border-x border-b border-white/10 bg-white/5 px-3 py-1.5" :style="{ color: textOn(bgDark) }">
          <span class="inline-flex items-center gap-1 text-[11px]">
            <img v-if="darkLogo" :src="darkLogo.url" class="h-3.5 w-3.5" style="image-rendering: pixelated" alt="" />
            <span v-else class="h-3.5 w-3.5 rounded-sm border border-dashed border-slate-500"></span>
            {{ state.ui.brandShort }}
          </span>
          <span class="text-[11px] opacity-50">☆</span>
        </div>
      </div>
    </div>

    <!-- 移动地址栏:取自 theme -->
    <div>
      <div class="mb-1 text-[11px] text-ink-dim">移动地址栏主题色(theme)</div>
      <div class="rounded-xl p-2" :style="{ background: wrapBg }">
        <div class="flex items-center gap-2 rounded-full px-3 py-1.5" :style="{ background: state.ui.themeColor }">
          <span class="text-[10px]" :style="{ color: textOn(state.ui.themeColor) }">🔒 shabox.fun</span>
        </div>
      </div>
    </div>

    <p class="text-[10px] text-ink-dim">深色背景自动用深色版 favicon(若已上传)。标签 / 书签会缩到 16px,留意此时的辨识度。</p>
  </div>
</template>
