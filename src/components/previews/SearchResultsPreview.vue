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
    <span class="block text-xs text-slate-400">搜索引擎结果(Google / Bing)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showLight" class="rounded-md border border-slate-200 bg-white p-2.5 text-slate-800">
        <div class="flex items-center gap-1.5">
          <img v-if="img" :src="img.url" class="h-4 w-4 rounded-full object-cover" alt="" />
          <span v-else class="h-4 w-4 rounded-full border border-dashed border-slate-300"></span>
          <span class="truncate text-[11px] text-slate-600">{{ state.ui.brandShort }}</span>
        </div>
        <div class="mt-0.5 truncate text-[10px] text-slate-500">https://shabox.fun</div>
        <div class="mt-1 text-[13px] text-[#1a0dab]">{{ state.ui.brandName }} · 个人博客</div>
        <div class="text-[11px] leading-snug text-slate-600">技术与生活随笔。文章、归档与 RSS。</div>
      </div>
      <div v-if="showDark" class="rounded-md border border-slate-700 bg-[#202124] p-2.5 text-slate-200">
        <div class="flex items-center gap-1.5">
          <img v-if="darkLogo" :src="darkLogo.url" class="h-4 w-4 rounded-full object-cover" alt="" />
          <span v-else class="h-4 w-4 rounded-full border border-dashed border-slate-600"></span>
          <span class="truncate text-[11px] text-slate-300">{{ state.ui.brandShort }}</span>
        </div>
        <div class="mt-0.5 truncate text-[10px] text-slate-400">https://shabox.fun</div>
        <div class="mt-1 text-[13px] text-[#8ab4f8]">{{ state.ui.brandName }} · 个人博客</div>
        <div class="text-[11px] leading-snug text-slate-400">技术与生活随笔。文章、归档与 RSS。</div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">搜索结果标题旁的 favicon 常被忽略;确认 16px 仍清晰。</p>
  </div>
</template>
