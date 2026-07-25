<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import type { UploadedFile } from '../../lib/types'

const props = withDefaults(defineProps<{ img: UploadedFile | null; imgDark?: UploadedFile | null }>(), {
  imgDark: null,
})
const { state } = useLogoStore()
const showLight = computed(() => state.ui.previewMode !== 'dark')
const showDark = computed(() => state.ui.previewMode !== 'light')
const isBoth = computed(() => state.ui.previewMode === 'both')
const darkLogo = computed(() => props.imgDark || props.img)
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">桌面标签 + 书签栏</span>

    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <!-- 浅色 -->
      <div v-if="showLight">
        <div class="flex items-end rounded-t-lg border-x border-t border-slate-300 bg-slate-200 p-2">
          <div class="inline-flex items-center gap-1.5 rounded-t-md bg-white px-2 py-1.5 text-slate-700 shadow-sm">
            <img v-if="img" :src="img.url" class="h-4 w-4" style="image-rendering: pixelated" alt="fav" />
            <span v-else class="h-4 w-4 rounded-sm border border-dashed border-slate-400"></span>
            <span class="truncate text-[11px]">{{ state.ui.brandName }}</span>
            <span class="text-[11px] opacity-40">×</span>
          </div>
        </div>
        <div class="flex items-center gap-2 border-x border-b border-slate-300 bg-white px-3 py-1.5 text-slate-500">
          <span class="text-[10px]">🔒</span><span class="text-[11px]">shabox.fun</span>
        </div>
        <div class="flex items-center gap-2 rounded-b-lg border-x border-b border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-600">
          <span class="inline-flex items-center gap-1 text-[11px]">
            <img v-if="img" :src="img.url" class="h-3.5 w-3.5" style="image-rendering: pixelated" alt="" />
            <span v-else class="h-3.5 w-3.5 rounded-sm border border-dashed border-slate-400"></span>
            {{ state.ui.brandShort }}
          </span>
          <span class="text-[11px] opacity-50">☆</span>
        </div>
      </div>

      <!-- 深色(用深色 favicon) -->
      <div v-if="showDark">
        <div class="flex items-end rounded-t-lg border-x border-t border-slate-700 bg-slate-800 p-2">
          <div class="inline-flex items-center gap-1.5 rounded-t-md bg-slate-900 px-2 py-1.5 text-slate-200">
            <img v-if="darkLogo" :src="darkLogo.url" class="h-4 w-4" style="image-rendering: pixelated" alt="fav" />
            <span v-else class="h-4 w-4 rounded-sm border border-dashed border-slate-500"></span>
            <span class="truncate text-[11px]">{{ state.ui.brandName }}</span>
            <span class="text-[11px] opacity-40">×</span>
          </div>
        </div>
        <div class="flex items-center gap-2 border-x border-b border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-400">
          <span class="text-[10px]">🔒</span><span class="text-[11px]">shabox.fun</span>
        </div>
        <div class="flex items-center gap-2 rounded-b-lg border-x border-b border-slate-700 bg-slate-900/60 px-3 py-1.5 text-slate-400">
          <span class="inline-flex items-center gap-1 text-[11px]">
            <img v-if="darkLogo" :src="darkLogo.url" class="h-3.5 w-3.5" style="image-rendering: pixelated" alt="" />
            <span v-else class="h-3.5 w-3.5 rounded-sm border border-dashed border-slate-500"></span>
            {{ state.ui.brandShort }}
          </span>
          <span class="text-[11px] opacity-50">☆</span>
        </div>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">深色背景自动用深色版 favicon(若已上传)。标签栏仅 16px,确认缩小后清晰。移动地址栏主题色见「PWA 安装」预览。</p>
  </div>
</template>
