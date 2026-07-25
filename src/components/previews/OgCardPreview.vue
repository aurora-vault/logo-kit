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
    <span class="block text-xs text-slate-400">社交分享卡(Twitter / 微信 / TG)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showDark" class="rounded-lg rounded-tl-none bg-slate-800 p-1.5">
        <div class="overflow-hidden rounded-md border border-slate-700" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center border border-dashed border-slate-600 text-[9px] text-slate-500">1200×630</div>
        </div>
      </div>
      <div v-if="showLight" class="rounded-lg rounded-tl-none bg-slate-200 p-1.5">
        <div class="overflow-hidden rounded-md border border-slate-300" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center border border-dashed border-slate-400 text-[9px] text-slate-500">1200×630</div>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">1200×630 分享卡。预留 padding,避免边缘被各平台裁切。</p>
  </div>
</template>
