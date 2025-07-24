<template>
    <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg text-white">
        <h2 class="text-2xl font-extrabold mb-6 text-red-600">
          {{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}
        </h2>
        <form @submit.prevent="submit" class="space-y-4">
          <label class="block">
            Nome
            <input v-model="localUser.name" type="text" required class="w-full p-3 mt-1 rounded bg-gray-700 border border-gray-600" />
          </label>
          <label class="block">
            Documento
            <input v-model="localUser.document" type="text" required :disabled="isEditing" class="w-full p-3 mt-1 rounded bg-gray-700 border border-gray-600 disabled:opacity-60" />
          </label>
          <label v-if="!isEditing" class="block">
            Senha
            <input v-model="localUser.password" type="password" required class="w-full p-3 mt-1 rounded bg-gray-700 border border-gray-600" />
          </label>
          <label class="block">
            Status
            <select v-model="localUser.status" class="w-full p-3 mt-1 rounded bg-gray-700 border border-gray-600">
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </label>
          <div class="flex justify-end gap-4">
            <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { User } from '@/stores/user';
  
  const props = defineProps<{ user: User; isEditing: boolean }>();
  const emit = defineEmits(['close', 'submit']);
  const localUser = ref<User>({ ...props.user });
  
  watch(() => props.user, (newVal) => {
    localUser.value = { ...newVal };
  });
  
  function submit() {
    emit('submit', localUser.value);
    emit('close');
  }
  </script>
  