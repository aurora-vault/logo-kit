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
    <span class="block text-xs text-slate-400">iOS 主屏(superellipse + 标签)</span>

    <div v-if="showDark" class="rounded-xl p-4" style="background: linear-gradient(160deg, #1e293b, #0f172a)">
      <div class="grid grid-cols-4 gap-3">
        <div v-for="i in 3" :key="'a' + i" class="flex flex-col items-center gap-1">
          <div class="h-12 w-12 rounded-[22%] bg-slate-700/60"></div>
          <span class="text-[9px] text-slate-500">应用</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <img v-if="img" :src="img.url" class="h-12 w-12 rounded-[22%] border border-white/10 object-cover shadow-lg shadow-black/40" alt="ios" />
          <div v-else class="h-12 w-12 rounded-[22%] border border-dashed border-slate-500"></div>
          <span class="text-[9px] font-medium text-slate-100">{{ state.ui.brandShort }}</span>
        </div>
        <div v-for="i in 4" :key="'b' + i" class="flex flex-col items-center gap-1">
          <div class="h-12 w-12 rounded-[22%] bg-slate-700/40"></div>
          <span class="text-[9px] text-slate-600">·</span>
        </div>
      </div>
    </div>

    <div v-if="showLight" :class="showDark ? 'mt-2' : ''">
      <div class="rounded-xl p-4" style="background: linear-gradient(160deg, #f1f5f9, #e2e8f0)">
        <div class="grid grid-cols-4 gap-3">
          <div v-for="i in 3" :key="'c' + i" class="flex flex-col items-center gap-1">
            <div class="h-12 w-12 rounded-[22%] bg-white shadow"></div>
            <span class="text-[9px] text-slate-400">应用</span>
          </div>
          <div class="flex flex-col items-center gap-1">
            <img v-if="img" :src="img.url" class="h-12 w-12 rounded-[22%] border border-black/10 object-cover shadow-lg shadow-black/20" alt="ios" />
            <div v-else class="h-12 w-12 rounded-[22%] border border-dashed border-slate-400"></div>
            <span class="text-[9px] font-medium text-slate-700">{{ state.ui.brandShort }}</span>
          </div>
          <div v-for="i in 4" :key="'d' + i" class="flex flex-col items-center gap-1">
            <div class="h-12 w-12 rounded-[22%] bg-white/70 shadow-sm"></div>
            <span class="text-[9px] text-slate-400">·</span>
          </div>
        </div>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">iOS 自动 superellipse 裁切。文件须无圆角、不透明,否则透明区会被填黑。</p>
  </div>
</template>
