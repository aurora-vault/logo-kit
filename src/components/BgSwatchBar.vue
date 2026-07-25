<script setup lang="ts">
/** 小型背景色切换条:6 档预设(白→黑)+ 自定义取色。用于在不透明图预览下切换衬底色查看边缘/留白。 */
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [string] }>()

const presets = ['#ffffff', '#e5e7eb', '#cbd5e1', '#64748b', '#1e293b', '#000000']
</script>

<template>
  <div class="flex items-center gap-1.5">
    <span class="text-[10px] text-slate-500">背景</span>
    <button
      v-for="c in presets"
      :key="c"
      type="button"
      class="h-4 w-4 rounded-full border transition"
      :class="
        modelValue.toLowerCase() === c.toLowerCase()
          ? 'border-blue-400 ring-1 ring-blue-400'
          : 'border-slate-600 hover:border-slate-400'
      "
      :style="{ background: c }"
      :title="c"
      @click="$emit('update:modelValue', c)"
    />
    <input
      type="color"
      :value="modelValue"
      class="h-4 w-5"
      title="自定义背景色"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
