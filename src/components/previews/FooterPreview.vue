<script setup lang="ts">
import { computed } from 'vue'
import { useLogoStore } from '../../composables/useLogoStore'
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

const props = defineProps<{ img: UploadedFile | null; imgDark: UploadedFile | null }>()
const { state } = useLogoStore()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
const darkLogo = computed(() => props.imgDark || props.img)
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">页脚 / 邮件签名(复用横版 logo)</span>
    <div :class="isBoth ? 'flex flex-col gap-2' : ''">
      <!-- 浅色块:页脚 + 邮件签名 -->
      <div v-if="showLight" class="space-y-2 rounded-md border border-black/10 p-2.5" :style="{ background: bgLight }">
        <div class="flex items-center gap-2">
          <img v-if="img" :src="img.url" class="h-5 w-auto object-contain" alt="foot" />
          <span v-else class="h-5 w-14 rounded border border-dashed border-slate-300"></span>
          <div class="ml-auto flex gap-2 text-[9px] opacity-60" :style="{ color: textOn(bgLight) }"><span>关于</span><span>归档</span><span>RSS</span></div>
        </div>
        <div class="flex items-center gap-2 border-t border-black/10 pt-2">
          <img v-if="img" :src="img.url" class="h-6 w-auto object-contain" alt="sig" />
          <span v-else class="h-6 w-12 rounded border border-dashed border-slate-300"></span>
          <div class="text-[9px] leading-tight" :style="{ color: textOn(bgLight) }">
            <div class="font-medium">{{ state.ui.brandName }}</div>
            <div class="opacity-70">shabox.fun</div>
          </div>
        </div>
      </div>
      <!-- 深色块:页脚 + 邮件签名 -->
      <div v-if="showDark" class="space-y-2 rounded-md border border-white/10 p-2.5" :style="{ background: bgDark }">
        <div class="flex items-center gap-2">
          <img v-if="darkLogo" :src="darkLogo.url" class="h-5 w-auto object-contain opacity-90" alt="foot" />
          <span v-else class="h-5 w-14 rounded border border-dashed border-slate-600"></span>
          <div class="ml-auto flex gap-2 text-[9px] opacity-60" :style="{ color: textOn(bgDark) }"><span>关于</span><span>归档</span><span>RSS</span></div>
        </div>
        <div class="flex items-center gap-2 border-t border-white/10 pt-2">
          <img v-if="darkLogo" :src="darkLogo.url" class="h-6 w-auto object-contain opacity-90" alt="sig" />
          <span v-else class="h-6 w-12 rounded border border-dashed border-slate-600"></span>
          <div class="text-[9px] leading-tight" :style="{ color: textOn(bgDark) }">
            <div class="font-medium">{{ state.ui.brandName }}</div>
            <div class="opacity-70">shabox.fun</div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">页脚 + 邮件签名,浅深两块各含两者可比;深色用深色版 logo(未传回退浅色)。</p>
  </div>
</template>
