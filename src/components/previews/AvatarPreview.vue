<script setup lang="ts">
import { usePreviewBg } from '../../composables/usePreviewBg'
import { textOn } from '../../lib/color'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { bgLight, bgDark, showLight, showDark, isBoth } = usePreviewBg()
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-ink-muted">社交头像(圆 / 圆角裁切)</span>
    <div :class="isBoth ? 'flex flex-col gap-2' : ''">
      <div v-if="showLight" class="flex items-center justify-around rounded-lg p-3" :style="{ background: bgLight }">
        <div class="flex flex-col items-center gap-1">
          <img v-if="img" :src="img.url" class="h-14 w-14 object-cover" style="border-radius: 50%" alt="avatar" />
          <div v-else class="h-14 w-14 border border-dashed border-slate-400" style="border-radius: 50%"></div>
          <span class="text-[10px]" :style="{ color: textOn(bgLight) }">圆</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <img v-if="img" :src="img.url" class="h-14 w-14 object-cover" style="border-radius: 18%" alt="avatar" />
          <div v-else class="h-14 w-14 border border-dashed border-slate-400" style="border-radius: 18%"></div>
          <span class="text-[10px]" :style="{ color: textOn(bgLight) }">圆角</span>
        </div>
      </div>
      <div v-if="showDark" class="flex items-center justify-around rounded-lg p-3" :style="{ background: bgDark }">
        <div class="flex flex-col items-center gap-1">
          <img v-if="img" :src="img.url" class="h-14 w-14 object-cover" style="border-radius: 50%" alt="avatar" />
          <div v-else class="h-14 w-14 border border-dashed border-slate-500" style="border-radius: 50%"></div>
          <span class="text-[10px]" :style="{ color: textOn(bgDark) }">圆</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <img v-if="img" :src="img.url" class="h-14 w-14 object-cover" style="border-radius: 18%" alt="avatar" />
          <div v-else class="h-14 w-14 border border-dashed border-slate-500" style="border-radius: 18%"></div>
          <span class="text-[10px]" :style="{ color: textOn(bgDark) }">圆角</span>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-ink-dim">各平台裁切不同。主体务必居中、四周留白(平台会强行裁圆 / 圆角)。</p>
  </div>
</template>
