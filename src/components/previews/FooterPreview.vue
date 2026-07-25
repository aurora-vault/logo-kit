<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import type { UploadedFile } from '../../lib/types'

const props = defineProps<{ img: UploadedFile | null; imgDark: UploadedFile | null }>()
const { state } = useLogoStore()
const showLight = computed(() => state.ui.previewMode !== 'dark')
const showDark = computed(() => state.ui.previewMode !== 'light')
const isBoth = computed(() => state.ui.previewMode === 'both')
const darkLogo = computed(() => props.imgDark || props.img)
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">页脚 / 邮件签名(复用横版 logo)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showDark" class="rounded-md border border-slate-800 bg-slate-950/60 p-2.5">
        <img v-if="darkLogo" :src="darkLogo.url" class="h-5 w-auto object-contain opacity-80" alt="foot" />
        <span v-else class="h-5 w-16 rounded border border-dashed border-slate-700"></span>
        <div class="mt-2 flex gap-2 text-[9px] text-slate-500"><span>关于</span><span>归档</span><span>RSS</span></div>
      </div>
      <div v-if="showLight" class="rounded-md border border-slate-200 bg-white p-2.5">
        <div class="flex items-center gap-2">
          <img v-if="img" :src="img.url" class="h-6 w-auto object-contain" alt="sig" />
          <span v-else class="h-6 w-14 rounded border border-dashed border-slate-300"></span>
          <div class="text-[9px] leading-tight text-slate-600">
            <div class="font-medium text-slate-800">{{ state.ui.brandName }}</div>
            <div>shabox.fun</div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">页脚常用深色版、邮件签名常用浅色版。</p>
  </div>
</template>
