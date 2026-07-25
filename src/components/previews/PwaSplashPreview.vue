<script setup lang="ts">
import { useLogoStore } from '../../composables/useLogoStore'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { state } = useLogoStore()
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">PWA 启动闪屏(背景色取自 bg)</span>
    <div class="flex items-center justify-center rounded-xl py-10" :style="{ background: state.ui.backgroundColor }">
      <div class="flex flex-col items-center gap-2">
        <img
          v-if="img"
          :src="img.url"
          class="h-16 w-16 rounded-[22%] object-cover shadow-lg shadow-black/30"
          alt="splash"
        />
        <div v-else class="h-16 w-16 rounded-[22%] border border-dashed border-white/40"></div>
        <span class="text-sm font-medium" :style="{ color: textOn(state.ui.backgroundColor) }">
          {{ state.ui.brandName }}
        </span>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">
      PWA 启动瞬间全屏显示:图标居中 + 背景色 + 站名。改上方 bg 字段,这里实时变色。
    </p>
  </div>
</template>
