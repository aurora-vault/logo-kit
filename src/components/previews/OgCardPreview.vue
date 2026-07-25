<script setup lang="ts">
import { usePreviewBg } from '../../composables/usePreviewBg'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">社交分享卡(Twitter / 微信 / TG)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showLight" class="rounded-lg p-1.5" :style="{ background: bgLight }">
        <div class="overflow-hidden rounded-md border border-black/10" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center text-[9px] text-slate-500">1200×630</div>
        </div>
      </div>
      <div v-if="showDark" class="rounded-lg p-1.5" :style="{ background: bgDark }">
        <div class="overflow-hidden rounded-md border border-white/10" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center text-[9px] text-slate-500">1200×630</div>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">1200×630 分享卡。预留 padding,避免边缘被各平台裁切。</p>
  </div>
</template>
