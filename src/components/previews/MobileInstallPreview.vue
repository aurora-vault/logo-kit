<script setup lang="ts">
import { useLogoStore } from '../../composables/useLogoStore'
import { textOn } from '../../lib/color'
import BgSwatchBar from '../BgSwatchBar.vue'
import type { UploadedFile } from '../../lib/types'

defineProps<{ img: UploadedFile | null }>()
const { state } = useLogoStore()
</script>

<template>
  <div class="space-y-2.5">
    <span class="block text-xs text-slate-400">PWA 安装:地址栏(theme)+ 启动屏(bg)一屏同看</span>

    <!-- 启动屏背景 = manifest background_color,此处调即改 manifest -->
    <BgSwatchBar
      :model-value="state.ui.backgroundColor"
      @update:model-value="state.ui.backgroundColor = $event"
    />

    <div class="mx-auto w-full max-w-[220px]">
      <div class="overflow-hidden rounded-[22px] border border-slate-700 shadow-lg shadow-black/30">
        <!-- 地址栏 chrome:取 theme -->
        <div class="flex items-center gap-1.5 px-3 py-2" :style="{ background: state.ui.themeColor }">
          <span class="text-[9px] font-medium" :style="{ color: textOn(state.ui.themeColor) }">🔒 shabox.fun</span>
          <span class="ml-auto text-[11px] leading-none" :style="{ color: textOn(state.ui.themeColor) }">⋯</span>
        </div>
        <!-- 启动屏:取 bg -->
        <div class="flex flex-col items-center gap-2 py-7" :style="{ background: state.ui.backgroundColor }">
          <img
            v-if="img"
            :src="img.url"
            class="h-14 w-14 rounded-[22%] object-cover shadow-lg shadow-black/30"
            alt="splash"
          />
          <div v-else class="h-14 w-14 rounded-[22%] border border-dashed border-white/40"></div>
          <span class="text-sm font-medium" :style="{ color: textOn(state.ui.backgroundColor) }">
            {{ state.ui.brandName }}
          </span>
        </div>
      </div>
    </div>

    <p class="text-[10px] leading-snug text-slate-500">
      地址栏取 theme、启动屏取 bg,合并成一屏避免深浅并排混乱。此处调 bg 即改 manifest background_color。
    </p>
  </div>
</template>
