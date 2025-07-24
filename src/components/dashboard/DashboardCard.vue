<template>
  <div
    class="bg-[#E50914] hover:bg-red-700 transition-colors duration-200 text-white font-semibold py-3 px-6 rounded-lg shadow"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-bold text-white">{{ value }}</div>
      <i :class="`ri-${icon}-line text-white/80 text-2xl`"></i>
    </div>
    <div class="text-sm text-white/70">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number
  icon: string
  color: string
}>()
</script>
