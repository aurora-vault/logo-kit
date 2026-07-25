<script setup lang="ts">
import { ref } from 'vue'
import BgSwatchBar from '../BgSwatchBar.vue'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
/** 衬底色:纯预览辅助(og 图本身不透明,切衬底看边缘留白),不进 manifest */
const bg = ref('#cbd5e1')
</script>

<template>
  <div class="space-y-2.5">
    <span class="block text-xs text-slate-400">社交分享卡(Twitter / 微信 / TG)</span>
    <BgSwatchBar v-model="bg" />
    <div class="rounded-lg p-2" :style="{ background: bg }">
      <div class="overflow-hidden rounded-md border border-black/10" style="aspect-ratio: 1200 / 630">
        <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
        <div
          v-else
          class="flex h-full w-full items-center justify-center border border-dashed border-slate-500/60 text-[9px] text-slate-500"
        >
          1200×630
        </div>
      </div>
    </div>
    <p class="text-[10px] leading-snug text-slate-500">
      1200×630。切衬底色看四周留白是否够 —— 各平台分享时会再裁切。
    </p>
  </div>
</template>
