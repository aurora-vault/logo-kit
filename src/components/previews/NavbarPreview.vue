<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

const props = defineProps<{ img: UploadedFile | null; imgDark: UploadedFile | null }>()
const { state } = useLogoStore()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
const darkLogo = computed(() => props.imgDark || props.img)
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">导航栏(桌面 / 移动 · 深浅两版 logo)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : 'space-y-2'">
      <div v-if="showLight" class="space-y-2">
        <div class="flex items-center gap-2 rounded-md border border-black/10 px-2.5 py-2" :style="{ background: bgLight }">
          <img v-if="img" :src="img.url" class="h-6 w-auto object-contain" alt="nav" />
          <span v-else class="h-6 w-16 rounded border border-dashed border-slate-300"></span>
          <div class="ml-auto flex gap-2 text-[10px] opacity-60" :style="{ color: textOn(bgLight) }"><span>首页</span><span>文章</span></div>
        </div>
        <div class="flex items-center gap-1.5 rounded-md border border-black/10 px-2.5 py-1" :style="{ background: bgLight, maxWidth: '200px' }">
          <span class="text-[10px] opacity-60" :style="{ color: textOn(bgLight) }">☰</span>
          <img v-if="img" :src="img.url" class="h-4 w-auto object-contain" alt="nav" />
          <span v-else class="h-4 w-10 rounded border border-dashed border-slate-300"></span>
          <span class="ml-auto text-[10px] opacity-50" :style="{ color: textOn(bgLight) }">{{ state.ui.brandShort }}</span>
        </div>
      </div>
      <div v-if="showDark" class="space-y-2">
        <div class="flex items-center gap-2 rounded-md border border-white/10 px-2.5 py-2" :style="{ background: bgDark }">
          <img v-if="darkLogo" :src="darkLogo.url" class="h-6 w-auto object-contain" alt="nav" />
          <span v-else class="h-6 w-16 rounded border border-dashed border-slate-600"></span>
          <div class="ml-auto flex gap-2 text-[10px] opacity-60" :style="{ color: textOn(bgDark) }"><span>首页</span><span>文章</span></div>
        </div>
        <div class="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1" :style="{ background: bgDark, maxWidth: '200px' }">
          <span class="text-[10px] opacity-60" :style="{ color: textOn(bgDark) }">☰</span>
          <img v-if="darkLogo" :src="darkLogo.url" class="h-4 w-auto object-contain" alt="nav" />
          <span v-else class="h-4 w-10 rounded border border-dashed border-slate-600"></span>
          <span class="ml-auto text-[10px] opacity-50" :style="{ color: textOn(bgDark) }">{{ state.ui.brandShort }}</span>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">横版透明单色。深色背景用深色版(未传则回退浅色)。</p>
  </div>
</template>
