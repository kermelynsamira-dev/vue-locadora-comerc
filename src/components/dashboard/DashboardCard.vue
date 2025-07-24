<template>
  <div
    :class="[
      'transition-colors duration-200 font-semibold py-3 px-6 rounded-lg shadow flex flex-col justify-between',
      bgColorClass,
      'text-white'
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-bold">{{ value }}</div>
      <!-- Ícone dinâmico usando classe do Remix Icon -->
      <i :class="`ri-${icon}-line text-white/80 text-2xl`"></i>
    </div>
    <div class="text-sm text-white/70">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
// Recebe props com tipos e valores
const props = defineProps<{
  title: string
  value: number
  icon: string
  color?: string  // opcional, se quiser customizar cor
}>()

// Computed para a cor de fundo dinamicamente via Tailwind ou hex
import { computed } from 'vue'

const bgColorClass = computed(() => {
  // Mapeamento simples para cores padrão, pode ampliar depois
  switch (props.color) {
    case 'red':
      return 'bg-[#E50914] hover:bg-red-700'
    case 'blue':
      return 'bg-blue-700 hover:bg-blue-800'
    case 'purple':
      return 'bg-purple-700 hover:bg-purple-800'
    case 'green':
      return 'bg-green-600 hover:bg-green-700'
    default:
      return 'bg-gray-700 hover:bg-gray-800'
  }
})
</script>
