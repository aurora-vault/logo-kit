<script setup lang="ts">
import { useSlotUpload } from '../composables/useSlotUpload'
import type { SlotDef } from '../specs/assets'

const props = defineProps<{ slot: SlotDef }>()
const { state, error, onPick, dimLabel, selectSlot } = useSlotUpload(props.slot)
</script>

<template>
  <div>
    <div
      class="flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1.5"
      :class="
        state.selectedSlotId === slot.id
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-transparent hover:border-line-strong hover:bg-surface-2/50'
      "
      @click="selectSlot(slot.id)"
    >
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-app/60">
        <img
          v-if="state.files[slot.id]"
          :src="state.files[slot.id]!.url"
          class="h-full w-full rounded object-contain"
          :style="{ imageRendering: slot.width > 0 && slot.width <= 64 ? 'pixelated' : 'auto' }"
          alt=""
        />
        <span v-else class="text-[9px] uppercase text-ink-dim">{{ slot.format }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <div class="truncate text-[11px] text-ink">{{ slot.fileName }}</div>
        <div class="text-[10px] text-ink-dim">{{ dimLabel() }} · {{ slot.hint }}</div>
      </div>
      <label
        class="shrink-0 cursor-pointer rounded px-1.5 py-0.5 text-[10px] transition-colors"
        :class="
          state.files[slot.id]
            ? 'text-ink-muted hover:bg-surface-3 hover:text-ink'
            : 'bg-surface-3 text-ink hover:bg-surface-3'
        "
        @click.stop
        @change="onPick($event)"
      >
        {{ state.files[slot.id] ? '换' : '上传' }}
        <input type="file" accept="image/*,.svg,.ico" class="hidden" />
      </label>
    </div>
    <p v-if="error" class="px-2 pb-1 text-[10px] text-red-400">{{ error }}</p>
  </div>
</template>
