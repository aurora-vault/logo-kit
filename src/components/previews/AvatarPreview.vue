<script setup lang="ts">
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-slate-400">社交头像(圆 / 圆角裁切)</span>
    <div class="flex items-center justify-around">
      <div class="flex flex-col items-center gap-1">
        <img v-if="img" :src="img.url" class="h-16 w-16 object-cover" style="border-radius: 50%" alt="avatar" />
        <div v-else class="h-16 w-16 border border-dashed border-slate-500" style="border-radius: 50%"></div>
        <span class="text-[10px] text-slate-500">圆 · Twitter/GitHub</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <img v-if="img" :src="img.url" class="h-16 w-16 object-cover" style="border-radius: 18%" alt="avatar" />
        <div v-else class="h-16 w-16 border border-dashed border-slate-500" style="border-radius: 18%"></div>
        <span class="text-[10px] text-slate-500">圆角 · 微信公众号</span>
      </div>
    </div>
    <p class="text-[10px] text-slate-500">各平台裁切不同。主体务必居中、四周留白(平台会强行裁圆 / 圆角)。</p>
  </div>
</template>
