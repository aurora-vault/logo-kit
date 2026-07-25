<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { state } = useLogoStore()
const showLight = computed(() => state.ui.previewMode !== 'dark')
const showDark = computed(() => state.ui.previewMode !== 'light')
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">桌面标签 + 书签栏</span>

    <!-- 浅色 -->
    <div v-if="showLight">
      <div class="flex items-end rounded-t-lg border-x border-t border-slate-300 bg-slate-200 p-2">
        <div class="inline-flex items-center gap-2 rounded-t-md bg-white px-3 py-1.5 text-slate-700 shadow-sm">
          <img v-if="img" :src="img.url" class="h-4 w-4" style="image-rendering: pixelated" alt="fav" />
          <span v-else class="h-4 w-4 rounded-sm border border-dashed border-slate-400"></span>
          <span class="text-xs">{{ state.ui.brandName }}</span>
          <span class="text-xs opacity-40">×</span>
        </div>
      </div>
      <div class="flex items-center gap-2 border-x border-b border-slate-300 bg-white px-3 py-1.5 text-slate-500">
        <span class="text-[10px]">🔒</span><span class="text-xs">shabox.fun</span>
      </div>
      <div class="flex items-center gap-3 rounded-b-lg border-x border-b border-slate-300 bg-slate-50 px-3 py-1.5 text-slate-600">
        <span class="inline-flex items-center gap-1 text-[11px]">
          <img v-if="img" :src="img.url" class="h-3.5 w-3.5" style="image-rendering: pixelated" alt="" />
          <span v-else class="h-3.5 w-3.5 rounded-sm border border-dashed border-slate-400"></span>
          {{ state.ui.brandShort }}
        </span>
        <span class="text-[11px] opacity-50">☆ 收藏</span>
      </div>
    </div>

    <!-- 深色 -->
    <div v-if="showDark" :class="showLight ? 'mt-2' : ''">
      <div class="flex items-end rounded-t-lg border-x border-t border-slate-700 bg-slate-800 p-2">
        <div class="inline-flex items-center gap-2 rounded-t-md bg-slate-900 px-3 py-1.5 text-slate-200">
          <img v-if="img" :src="img.url" class="h-4 w-4" style="image-rendering: pixelated" alt="fav" />
          <span v-else class="h-4 w-4 rounded-sm border border-dashed border-slate-500"></span>
          <span class="text-xs">{{ state.ui.brandName }}</span>
          <span class="text-xs opacity-40">×</span>
        </div>
      </div>
      <div class="flex items-center gap-2 border-x border-b border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-400">
        <span class="text-[10px]">🔒</span><span class="text-xs">shabox.fun</span>
      </div>
      <div class="flex items-center gap-3 rounded-b-lg border-x border-b border-slate-700 bg-slate-900/60 px-3 py-1.5 text-slate-400">
        <span class="inline-flex items-center gap-1 text-[11px]">
          <img v-if="img" :src="img.url" class="h-3.5 w-3.5" style="image-rendering: pixelated" alt="" />
          <span v-else class="h-3.5 w-3.5 rounded-sm border border-dashed border-slate-500"></span>
          {{ state.ui.brandShort }}
        </span>
        <span class="text-[11px] opacity-50">☆ 收藏</span>
      </div>
    </div>

    <!-- 移动地址栏:颜色取自 theme -->
    <div>
      <div class="mb-1 text-[11px] text-slate-500">移动地址栏主题色(theme)</div>
      <div class="rounded-xl p-2" style="background: #e2e8f0">
        <div class="flex items-center gap-2 rounded-full px-3 py-1.5" :style="{ background: state.ui.themeColor }">
          <span class="text-[10px]" :style="{ color: textOn(state.ui.themeColor) }">🔒 shabox.fun</span>
        </div>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">标签栏真实仅 16px,确认主图标缩小后仍清晰。勾选顶部「真实标签预览」可在真实浏览器标签看效果。</p>
  </div>
</template>
