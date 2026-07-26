<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLogoStore } from '../composables/useLogoStore'
import { CATEGORIES, slotsByCategory, slotById } from '../specs/assets'
import SlotRow from './SlotRow.vue'

const { state } = useLogoStore()
/** 各分类是否收起(默认全展开) */
const collapsed = ref<Record<string, boolean>>({})
/** 当前选中槽位所属分类(驱动分类卡联动高亮) */
const selectedCatId = computed(() => slotById(state.selectedSlotId)?.category ?? '')

const doneOf = (catId: string) => slotsByCategory(catId).filter((s) => state.files[s.id]).length
const totalOf = (catId: string) => slotsByCategory(catId).length
const toggleCat = (catId: string) => (collapsed.value[catId] = !collapsed.value[catId])
</script>

<template>
  <aside class="flex h-full w-72 shrink-0 flex-col gap-2 overflow-y-auto border-r border-line bg-app p-3">
    <div
      v-for="cat in CATEGORIES"
      :key="cat.id"
      class="shrink-0 overflow-hidden rounded-lg border bg-surface/40 transition-colors"
      :class="cat.id === selectedCatId ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-line'"
    >
      <!-- 分类头(可展开/收起) -->
      <button
        class="flex w-full items-center gap-2 px-3 py-2 text-left"
        @click="toggleCat(cat.id)"
      >
        <span
          class="text-[10px] text-ink-dim transition-transform"
          :class="collapsed[cat.id] ? '' : 'rotate-90'"
        >▶</span>
        <span class="h-2.5 w-2.5 rounded-full" :style="{ background: cat.accent }"></span>
        <span class="text-xs font-medium text-ink">{{ cat.label }}</span>
        <span class="ml-auto rounded bg-surface-2 px-1.5 text-[10px] text-ink-muted">
          {{ doneOf(cat.id) }}/{{ totalOf(cat.id) }}
        </span>
      </button>

      <div v-show="!collapsed[cat.id]">
        <div class="space-y-1 p-2">
          <SlotRow v-for="slot in slotsByCategory(cat.id)" :key="slot.id" :slot="slot" />
        </div>
      </div>
    </div>
  </aside>
</template>
