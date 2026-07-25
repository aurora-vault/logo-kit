<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { state } = useLogoStore()
const showLight = computed(() => state.ui.previewMode !== 'dark')
const showDark = computed(() => state.ui.previewMode !== 'light')
const isBoth = computed(() => state.ui.previewMode === 'both')
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">iOS 主屏(superellipse + 标签)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showDark" class="flex flex-col items-center gap-1 rounded-xl py-3" style="background: linear-gradient(160deg, #1e293b, #0f172a)">
        <img v-if="img" :src="img.url" class="h-11 w-11 rounded-[22%] border border-white/10 object-cover shadow-lg shadow-black/40" alt="ios" />
        <div v-else class="h-11 w-11 rounded-[22%] border border-dashed border-slate-500"></div>
        <span class="text-[9px] font-medium text-slate-100">{{ state.ui.brandShort }}</span>
      </div>
      <div v-if="showLight" class="flex flex-col items-center gap-1 rounded-xl py-3" style="background: linear-gradient(160deg, #f1f5f9, #e2e8f0)">
        <img v-if="img" :src="img.url" class="h-11 w-11 rounded-[22%] border border-black/10 object-cover shadow-lg shadow-black/20" alt="ios" />
        <div v-else class="h-11 w-11 rounded-[22%] border border-dashed border-slate-400"></div>
        <span class="text-[9px] font-medium text-slate-700">{{ state.ui.brandShort }}</span>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">iOS 自动 superellipse 裁切。文件须不透明,否则透明区被填黑。</p>
  </div>
</template>
