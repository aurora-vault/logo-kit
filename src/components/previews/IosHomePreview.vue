<script setup lang="ts">
import { useLogoStore } from '../../composables/useLogoStore'
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { state } = useLogoStore()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">iOS 主屏(superellipse + 标签)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showLight" class="flex flex-col items-center gap-1 rounded-xl py-3" :style="{ background: bgLight }">
        <img v-if="img" :src="img.url" class="h-11 w-11 rounded-[22%] border border-black/10 object-cover shadow-lg shadow-black/20" alt="ios" />
        <div v-else class="h-11 w-11 rounded-[22%] border border-dashed border-slate-400"></div>
        <span class="text-[9px] font-medium" :style="{ color: textOn(bgLight) }">{{ state.ui.brandShort }}</span>
      </div>
      <div v-if="showDark" class="flex flex-col items-center gap-1 rounded-xl py-3" :style="{ background: bgDark }">
        <img v-if="img" :src="img.url" class="h-11 w-11 rounded-[22%] border border-white/10 object-cover shadow-lg shadow-black/40" alt="ios" />
        <div v-else class="h-11 w-11 rounded-[22%] border border-dashed border-slate-500"></div>
        <span class="text-[9px] font-medium" :style="{ color: textOn(bgDark) }">{{ state.ui.brandShort }}</span>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">iOS 自动 superellipse 裁切。文件须不透明,否则透明区被填黑。</p>
  </div>
</template>
