<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

const props = withDefaults(defineProps<{ img: UploadedFile | null; imgDark?: UploadedFile | null }>(), { imgDark: null })
const { state } = useLogoStore()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
const darkLogo = computed(() => props.imgDark || props.img)
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-ink-muted">搜索引擎结果(Google / Bing)</span>
    <div :class="isBoth ? 'grid grid-cols-2 gap-2' : ''">
      <div v-if="showLight" class="rounded-md border border-black/10 p-2.5" :style="{ background: bgLight, color: textOn(bgLight) }">
        <div class="flex items-center gap-1.5">
          <img v-if="img" :src="img.url" class="h-4 w-4 rounded-full object-cover" alt="" />
          <span v-else class="h-4 w-4 rounded-full border border-dashed border-slate-400"></span>
          <span class="truncate text-[11px] opacity-70">{{ state.ui.brandShort }}</span>
        </div>
        <div class="mt-0.5 truncate text-[10px] opacity-60">https://shabox.fun</div>
        <div class="mt-1 text-[13px] font-medium" :style="{ color: textOn(bgLight) }">{{ state.ui.brandName }} · 个人博客</div>
        <div class="text-[11px] leading-snug opacity-70">技术与生活随笔。文章、归档与 RSS。</div>
      </div>
      <div v-if="showDark" class="rounded-md border border-white/10 p-2.5" :style="{ background: bgDark, color: textOn(bgDark) }">
        <div class="flex items-center gap-1.5">
          <img v-if="darkLogo" :src="darkLogo.url" class="h-4 w-4 rounded-full object-cover" alt="" />
          <span v-else class="h-4 w-4 rounded-full border border-dashed border-slate-600"></span>
          <span class="truncate text-[11px] opacity-70">{{ state.ui.brandShort }}</span>
        </div>
        <div class="mt-0.5 truncate text-[10px] opacity-60">https://shabox.fun</div>
        <div class="mt-1 text-[13px] font-medium" :style="{ color: textOn(bgDark) }">{{ state.ui.brandName }} · 个人博客</div>
        <div class="text-[11px] leading-snug opacity-70">技术与生活随笔。文章、归档与 RSS。</div>
      </div>
    </div>
    <p class="text-[10px] text-ink-dim">搜索结果标题旁的 favicon 常被忽略;确认 16px 仍清晰。</p>
  </div>
</template>
