<template>
  <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg text-white overflow-auto max-h-[90vh]">
      <h2 class="text-2xl font-extrabold mb-6 text-red-600">
        {{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="localUser.name"
          type="text"
          placeholder="Nome"
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        />

        <input
          v-model="localUser.document"
          type="text"
          placeholder="Documento"
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        />

        <input
          v-if="!isEditing"
          v-model="localUser.password"
          type="password"
          placeholder="Senha"
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        />

        <select
          v-model="localUser.status"
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>

        <div class="flex justify-end gap-4 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            lass="px-4 py-2 border border-gray-500 text-white rounded hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            {{ isEditing ? 'Atualizar' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { User } from '@/stores/user';

const props = defineProps<{
  user: User;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', user: User): void;
}>();

const localUser = reactive<User>({
  id: '',
  name: '',
  document: '',
  password: '',
  status: 'active'
});

watch(
  () => props.user,
  (newUser) => {
    Object.assign(localUser, newUser);
  },
  { immediate: true }
);

function handleSubmit() {
  emit('submit', { ...localUser });
}
</script>
