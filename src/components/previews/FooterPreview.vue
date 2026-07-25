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
    <span class="block text-xs text-slate-400">页脚 / 邮件签名(复用横版 logo)</span>

    <!-- 页脚(深色背景) -->
    <div v-if="showDark" class="rounded-md border border-slate-800 bg-slate-950/60 p-3">
      <img v-if="darkLogo" :src="darkLogo.url" class="h-6 w-auto object-contain opacity-80" alt="foot" />
      <span v-else class="h-6 w-24 rounded border border-dashed border-slate-700"></span>
      <div class="mt-2 flex gap-3 text-[10px] text-slate-500"><span>关于</span><span>归档</span><span>RSS</span><span>© 2026</span></div>
    </div>

    <!-- 邮件签名(浅色背景) -->
    <div v-if="showLight" :class="showDark ? 'mt-2' : ''">
      <div class="rounded-md border border-slate-200 bg-white p-3">
        <div class="flex items-center gap-2">
          <img v-if="img" :src="img.url" class="h-7 w-auto object-contain" alt="sig" />
          <span v-else class="h-7 w-20 rounded border border-dashed border-slate-300"></span>
          <div class="text-[10px] leading-tight text-slate-600">
            <div class="font-medium text-slate-800">{{ state.ui.brandName }}</div>
            <div>shabox.fun · 博客</div>
          </div>
        </div>
      </div>
    </div>

    <p class="text-[10px] text-slate-500">页脚常用深色版、邮件签名常用浅色版(与导航栏同一组文件)。</p>
  </div>
</template>
