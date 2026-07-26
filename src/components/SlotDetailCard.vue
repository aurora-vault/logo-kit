<script setup lang="ts">
import { useSlotUpload } from '../composables/useSlotUpload'
import type { SlotDef } from '../specs/assets'

const props = defineProps<{ slot: SlotDef }>()
const { state, error, onPick, dimLabel } = useSlotUpload(props.slot)
</script>

<template>
  <div
    class="rounded-lg border p-2.5 transition-colors"
    :class="state.selectedSlotId === slot.id ? 'border-blue-500 bg-blue-500/10' : 'border-line bg-surface/40'"
  >
    <div class="flex items-start gap-2.5">
      <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-app/60">
        <img
          v-if="state.files[slot.id]"
          :src="state.files[slot.id]!.url"
          class="h-full w-full rounded-md object-contain"
          :style="{ imageRendering: slot.width > 0 && slot.width <= 64 ? 'pixelated' : 'auto' }"
          alt=""
        />
        <span v-else class="text-[10px] uppercase text-ink-dim">{{ slot.format }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-1.5">
          <span class="truncate text-xs font-medium text-ink">{{ slot.fileName }}</span>
          <span v-if="state.files[slot.id]" class="shrink-0 text-[11px] text-emerald-500">✓</span>
        </div>
        <div class="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] text-ink-dim">
          <span class="rounded bg-surface-2 px-1.5 text-ink-muted">{{ dimLabel() }}</span>
          <span v-if="slot.variant === 'dark'" class="rounded bg-surface-2 px-1.5 text-ink-muted">深色版</span>
          <span v-else-if="slot.variant === 'light'" class="rounded bg-surface-2 px-1.5 text-ink-muted">浅色版</span>
          <span class="uppercase">{{ slot.format }}</span>
        </div>
        <p class="mt-1.5 text-[10px] leading-relaxed text-ink-muted">{{ slot.desc || slot.hint }}</p>
      </div>
    </div>
    <div class="mt-2 flex items-center justify-end gap-2">
      <span v-if="error" class="mr-auto text-[10px] text-red-400">{{ error }}</span>
      <label
        class="cursor-pointer rounded px-2.5 py-1 text-[10px] font-medium transition-colors"
        :class="
          state.files[slot.id]
            ? 'border border-line-strong text-ink-muted hover:bg-surface-2 hover:text-ink'
            : 'bg-blue-600 text-white hover:bg-blue-500'
        "
        @click.stop
        @change="onPick($event)"
      >
        {{ state.files[slot.id] ? '更换' : '上传此尺寸' }}
        <input type="file" accept="image/*,.svg,.ico" class="hidden" />
      </label>
    </div>
  </div>
</template>
