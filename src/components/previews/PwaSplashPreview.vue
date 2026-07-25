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
    <span class="block text-xs text-slate-400">PWA 启动闪屏</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showLight" class="flex items-center justify-center rounded-xl py-10" :style="{ background: bgLight }">
        <div class="flex flex-col items-center gap-2">
          <img v-if="img" :src="img.url" class="h-16 w-16 rounded-[22%] object-cover shadow-lg shadow-black/30" alt="splash" />
          <div v-else class="h-16 w-16 rounded-[22%] border border-dashed border-slate-400"></div>
          <span class="text-sm font-medium" :style="{ color: textOn(bgLight) }">{{ state.ui.brandName }}</span>
        </div>
      </div>
      <div v-if="showDark" class="flex items-center justify-center rounded-xl py-10" :style="{ background: bgDark }">
        <div class="flex flex-col items-center gap-2">
          <img v-if="img" :src="img.url" class="h-16 w-16 rounded-[22%] object-cover shadow-lg shadow-black/30" alt="splash" />
          <div v-else class="h-16 w-16 rounded-[22%] border border-dashed border-slate-500"></div>
          <span class="text-sm font-medium" :style="{ color: textOn(bgDark) }">{{ state.ui.brandName }}</span>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">PWA 启动瞬间全屏显示:图标居中 + 背景色 + 站名。选「色」用自定义背景。</p>
  </div>
</template>
