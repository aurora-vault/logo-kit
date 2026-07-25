<script setup lang="ts">
import { ref } from 'vue'
import BgSwatchBar from '../BgSwatchBar.vue'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
/** 衬底色:切不同平台背景看圆形/圆角裁切后是否露白边 */
const bg = ref('#e5e7eb')
</script>

<template>
  <div class="space-y-2.5">
    <span class="block text-xs text-slate-400">社交头像(圆 / 圆角裁切)</span>
    <BgSwatchBar v-model="bg" />
    <div class="flex items-center justify-around rounded-lg p-3" :style="{ background: bg }">
      <div class="flex flex-col items-center gap-1">
        <img
          v-if="img"
          :src="img.url"
          class="h-14 w-14 object-cover border border-black/10"
          style="border-radius: 50%"
          alt="avatar"
        />
        <div v-else class="h-14 w-14 border border-dashed border-slate-500" style="border-radius: 50%"></div>
        <span class="text-[10px] text-slate-600">圆 · Twitter/GitHub</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <img
          v-if="img"
          :src="img.url"
          class="h-14 w-14 object-cover border border-black/10"
          style="border-radius: 18%"
          alt="avatar"
        />
        <div v-else class="h-14 w-14 border border-dashed border-slate-500" style="border-radius: 18%"></div>
        <span class="text-[10px] text-slate-600">圆角 · 微信公众号</span>
      </div>
    </div>
    <p class="text-[10px] leading-snug text-slate-500">
      各平台强行裁圆 / 圆角。切衬底看是否露白边;主体务必居中、四周留白。
    </p>
  </div>
</template>
