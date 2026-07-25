<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import type { UploadedFile } from '../../lib/types'

const props = defineProps<{ img: UploadedFile | null; imgDark: UploadedFile | null }>()
const { state } = useLogoStore()
const showLight = computed(() => state.ui.previewMode !== 'dark')
const showDark = computed(() => state.ui.previewMode !== 'light')
const darkLogo = computed(() => props.imgDark || props.img)
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">导航栏(浅 / 深 / 移动 · 深浅两版 logo)</span>

    <!-- 浅色 -->
    <div v-if="showLight" class="space-y-2">
      <div class="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
        <img v-if="img" :src="img.url" class="h-7 w-auto object-contain" alt="nav" />
        <span v-else class="h-7 w-20 rounded border border-dashed border-slate-300"></span>
        <div class="ml-auto flex gap-3 text-[11px] text-slate-600"><span>首页</span><span>文章</span><span>关于</span></div>
      </div>
      <div class="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5" style="max-width: 240px">
        <span class="text-slate-500">☰</span>
        <img v-if="img" :src="img.url" class="h-5 w-auto object-contain" alt="nav" />
        <span v-else class="h-5 w-12 rounded border border-dashed border-slate-300"></span>
        <span class="ml-auto text-[11px] text-slate-400">{{ state.ui.brandShort }}</span>
      </div>
    </div>

    <!-- 深色 -->
    <div v-if="showDark" :class="['space-y-2', showLight ? 'mt-2' : '']">
      <div class="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-900 px-3 py-2">
        <img v-if="darkLogo" :src="darkLogo.url" class="h-6 w-auto object-contain" alt="nav" />
        <span v-else class="h-6 w-20 rounded border border-dashed border-slate-600"></span>
        <div class="ml-auto flex gap-3 text-[11px] text-slate-300"><span>首页</span><span>文章</span><span>关于</span></div>
      </div>
      <div class="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5" style="max-width: 240px">
        <span class="text-slate-400">☰</span>
        <img v-if="darkLogo" :src="darkLogo.url" class="h-5 w-auto object-contain" alt="nav" />
        <span v-else class="h-5 w-12 rounded border border-dashed border-slate-600"></span>
        <span class="ml-auto text-[11px] text-slate-400">{{ state.ui.brandShort }}</span>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">横版透明单色。深色背景用深色版 logo(若未上传深色版,将回退到浅色版)。</p>
  </div>
</template>
