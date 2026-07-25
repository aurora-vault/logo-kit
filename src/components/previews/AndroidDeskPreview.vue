<script setup lang="ts">
import { ref } from 'vue'
import BgSwatchBar from '../BgSwatchBar.vue'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
/** 衬底色:切不同启动器背景,看裁切 + safe zone 是否露白边 */
const bg = ref('#cbd5e1')

const shapes = [
  { id: 'circle', name: '圆形', r: '50%' },
  { id: 'squircle', name: '方圆', r: '32%' },
  { id: 'rounded', name: '圆角', r: '18%' },
  { id: 'teardrop', name: '水滴', r: '50% 50% 50% 0' },
]
</script>

<template>
  <div class="space-y-2.5">
    <span class="block text-xs text-slate-400">安卓桌面(多形状裁切 + safe zone)</span>
    <BgSwatchBar v-model="bg" />
    <div class="grid grid-cols-4 gap-2 rounded-lg p-3" :style="{ background: bg }">
      <div v-for="sh in shapes" :key="sh.id" class="flex flex-col items-center gap-1">
        <div class="relative aspect-square w-full">
          <img
            v-if="img"
            :src="img.url"
            class="h-full w-full border border-black/10 object-cover"
            :style="{ borderRadius: sh.r }"
            alt="pwa"
          />
          <div v-else class="h-full w-full border border-dashed border-slate-500" :style="{ borderRadius: sh.r }"></div>
          <div class="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-yellow-400/60"></div>
        </div>
        <span class="text-[10px] text-slate-600">{{ sh.name }}</span>
      </div>
    </div>
    <p class="text-[10px] leading-snug text-slate-500">切衬底模拟不同启动器背景;虚线圈 = safe zone,maskable 主体应已在圈内。</p>
  </div>
</template>
