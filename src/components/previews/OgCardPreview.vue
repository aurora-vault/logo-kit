<script setup lang="ts">
import { computed } from 'vue'
import { usePreviewBg } from '../../composables/usePreviewBg'
import type { UploadedFile } from '../../lib/types'

const props = defineProps<{ img: UploadedFile | null; forceVariant?: 'light' | 'dark' }>()
const { bgLight, bgDark, showLight, showDark } = usePreviewBg()
/** forceVariant 由 PreviewStage 传入:全模式复制成两张整卡时,各自只画浅或深 */
const light = computed(() => (props.forceVariant ? props.forceVariant === 'light' : showLight.value))
const dark = computed(() => (props.forceVariant ? props.forceVariant === 'dark' : showDark.value))
</script>

<template>
  <div class="space-y-3">
    <span class="block text-xs text-ink-muted">社交分享卡(Twitter / 微信 / TG)</span>
    <div class="space-y-2">
      <div v-if="light" class="rounded-lg p-1.5" :style="{ background: bgLight }">
        <div class="overflow-hidden rounded-md border border-black/10" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center text-[9px] text-ink-dim">1200×630</div>
        </div>
      </div>
      <div v-if="dark" class="rounded-lg p-1.5" :style="{ background: bgDark }">
        <div class="overflow-hidden rounded-md border border-white/10" style="aspect-ratio: 1200 / 630">
          <img v-if="img" :src="img.url" class="h-full w-full object-cover" alt="og" />
          <div v-else class="flex h-full w-full items-center justify-center text-[9px] text-ink-dim">1200×630</div>
        </div>
      </div>
    </div>
    <p class="text-[10px] text-ink-dim">1200×630 分享卡。预留 padding,避免边缘被各平台裁切。</p>
  </div>
</template>
