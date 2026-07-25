<script setup lang="ts">
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()

const shapes = [
  { id: 'circle', name: '圆形', r: '50%' },
  { id: 'squircle', name: '方圆', r: '32%' },
  { id: 'rounded', name: '圆角', r: '18%' },
  { id: 'teardrop', name: '水滴', r: '50% 50% 50% 0' },
]
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">安卓桌面(多形状裁切 + safe zone)</span>
    <div :class="isBoth ? 'flex flex-col gap-2' : ''">
      <div v-if="showLight" class="grid grid-cols-4 gap-2 rounded-lg p-3" :style="{ background: bgLight }">
        <div v-for="sh in shapes" :key="sh.id" class="flex flex-col items-center gap-1">
          <div class="relative aspect-square w-full">
            <img v-if="img" :src="img.url" class="h-full w-full border border-black/10 object-cover" :style="{ borderRadius: sh.r }" alt="pwa" />
            <div v-else class="h-full w-full border border-dashed border-slate-400" :style="{ borderRadius: sh.r }"></div>
            <div class="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-yellow-400/70"></div>
          </div>
          <span class="text-[10px]" :style="{ color: textOn(bgLight) }">{{ sh.name }}</span>
        </div>
      </div>
      <div v-if="showDark" class="grid grid-cols-4 gap-2 rounded-lg p-3" :style="{ background: bgDark }">
        <div v-for="sh in shapes" :key="sh.id" class="flex flex-col items-center gap-1">
          <div class="relative aspect-square w-full">
            <img v-if="img" :src="img.url" class="h-full w-full border border-white/10 object-cover" :style="{ borderRadius: sh.r }" alt="pwa" />
            <div v-else class="h-full w-full border border-dashed border-slate-500" :style="{ borderRadius: sh.r }"></div>
            <div class="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-yellow-400/70"></div>
          </div>
          <span class="text-[10px]" :style="{ color: textOn(bgDark) }">{{ sh.name }}</span>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">虚线圈 = safe zone。maskable 主体应已在圈内,任何形状都不裁到。</p>
  </div>
</template>
