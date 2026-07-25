<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { state } = useLogoStore()
const showLight = computed(() => state.ui.previewMode !== 'dark')
const showDark = computed(() => state.ui.previewMode !== 'light')
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">社交分享卡(Twitter / 微信 / TG)</span>

    <!-- 深色 IM 气泡 -->
    <div v-if="showDark">
      <div class="mx-auto max-w-sm rounded-lg rounded-tl-none bg-slate-800 p-2">
        <div class="overflow-hidden rounded-md border border-slate-700" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center border border-dashed border-slate-600 text-[10px] text-slate-500">1200×630</div>
        </div>
        <div class="mt-1 truncate text-[10px] text-slate-400">shabox.fun · {{ state.ui.brandName }}</div>
      </div>
    </div>

    <!-- 浅色 IM 气泡 -->
    <div v-if="showLight" :class="showDark ? 'mt-2' : ''">
      <div class="mx-auto max-w-sm rounded-lg rounded-tl-none bg-slate-200 p-2">
        <div class="overflow-hidden rounded-md border border-slate-300" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center border border-dashed border-slate-400 text-[10px] text-slate-500">1200×630</div>
        </div>
        <div class="mt-1 truncate text-[10px] text-slate-600">shabox.fun · {{ state.ui.brandName }}</div>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">1200×630 横版分享卡。预留 padding,避免边缘被各平台裁切。</p>
  </div>
</template>
