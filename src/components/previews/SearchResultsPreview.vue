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
    <span class="block text-xs text-slate-400">搜索引擎结果(Google / Bing)</span>

    <!-- 浅色 -->
    <div v-if="showLight" class="rounded-md border border-slate-200 bg-white p-3 text-slate-800">
      <div class="flex items-center gap-1.5">
        <img v-if="img" :src="img.url" class="h-4 w-4 rounded-full object-cover" alt="" />
        <span v-else class="h-4 w-4 rounded-full border border-dashed border-slate-300"></span>
        <span class="text-[11px] text-slate-600">{{ state.ui.brandShort }}</span>
        <span class="text-[11px] text-slate-400">› 首页</span>
      </div>
      <div class="mt-0.5 text-[10px] text-slate-500">https://shabox.fun</div>
      <div class="mt-1 text-sm text-[#1a0dab]">{{ state.ui.brandName }} · 个人博客</div>
      <div class="text-[11px] leading-snug text-slate-600">技术与生活随笔。最新文章、归档与 RSS 订阅。</div>
    </div>

    <!-- 深色(Google 深色模式) -->
    <div v-if="showDark" :class="showLight ? 'mt-2' : ''">
      <div class="rounded-md border border-slate-700 bg-[#202124] p-3 text-slate-200">
        <div class="flex items-center gap-1.5">
          <img v-if="img" :src="img.url" class="h-4 w-4 rounded-full object-cover" alt="" />
          <span v-else class="h-4 w-4 rounded-full border border-dashed border-slate-600"></span>
          <span class="text-[11px] text-slate-300">{{ state.ui.brandShort }}</span>
          <span class="text-[11px] text-slate-500">› 首页</span>
        </div>
        <div class="mt-0.5 text-[10px] text-slate-400">https://shabox.fun</div>
        <div class="mt-1 text-sm text-[#8ab4f8]">{{ state.ui.brandName }} · 个人博客</div>
        <div class="text-[11px] leading-snug text-slate-400">技术与生活随笔。最新文章、归档与 RSS 订阅。</div>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">搜索结果标题旁会显示 favicon,常被忽略;确认它在 16px 仍清晰可辨。</p>
  </div>
</template>
