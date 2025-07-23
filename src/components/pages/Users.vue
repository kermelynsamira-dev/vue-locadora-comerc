<template>
  <div class="min-h-screen bg-gray-900">
    <div class="p-6 max-w-5xl mx-auto text-white font-montserrat">
    <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-600 drop-shadow-lg">
      Gestão de Usuários
    </h1>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-4 mb-6 items-center">
      <input
        v-model="searchName"
        type="text"
        placeholder="Buscar por nome..."
        class="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 flex-grow transition"
      />

      <select
        v-model="filterStatus"
        class="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition"
      >
        <option value="all" class="text-black">Todos</option>
        <option value="active" class="text-black">Ativos</option>
        <option value="inactive" class="text-black">Inativos</option>
      </select>

      <button
        @click="openModalForNewUser"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded shadow-md transition ease-in-out duration-300"
      >
        + Novo Usuário
      </button>
    </div>

    <!-- Alertas -->
    <div
      v-if="alertMessage"
      :class="[
        'mb-4 p-3 rounded text-white drop-shadow-md',
        alertType === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
    >
      {{ alertMessage }}
    </div>

    <!-- Tabela de usuários -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-700 text-white min-w-[600px]">
        <thead>
          <tr class="bg-red-700">
            <th class="border border-gray-600 p-3 text-left">Nome</th>
            <th class="border border-gray-600 p-3 text-left">Documento</th>
            <th class="border border-gray-600 p-3 text-left">Status</th>
            <th class="border border-gray-600 p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="hover:bg-red-800 cursor-default transition-colors duration-200"
          >
            <td class="border border-gray-600 p-3">{{ user.name }}</td>
            <td class="border border-gray-600 p-3">{{ user.document }}</td>
            <td class="border border-gray-600 p-3 capitalize">{{ user.status }}</td>
            <td class="border border-gray-600 p-3 text-center space-x-3">
              <button
                @click.stop="openModalForEditUser(user)"
                class="text-red-300 hover:text-white font-semibold transition-colors duration-200"
                aria-label="Editar usuário"
              >
                Editar
              </button>
              <button
                @click.stop="confirmDeactivate(user)"
                :disabled="user.status === 'inactive'"
                :class="[
                  'font-semibold transition-colors duration-200',
                  user.status === 'inactive'
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-red-300 hover:text-white'
                ]"
                aria-label="Desativar usuário"
              >
                Desativar
              </button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="4" class="text-center p-4 text-gray-400">
              Nenhum usuário encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para cadastro/edição -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg drop-shadow-lg text-white">
        <h2 class="text-2xl font-extrabold mb-6 tracking-wide text-red-600 drop-shadow-md">
          {{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}
        </h2>

        <form @submit.prevent="submitForm" class="space-y-4">
          <label class="block">
            Nome
            <input
              v-model="form.name"
              type="text"
              required
              class="bg-gray-700 border border-gray-600 rounded w-full px-4 py-3 mt-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          </label>

          <label class="block">
            Documento
            <input
              v-model="form.document"
              type="text"
              required
              :disabled="isEditing"
              class="bg-gray-700 border border-gray-600 rounded w-full px-4 py-3 mt-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </label>

          <label class="block" v-if="!isEditing">
            Senha
            <input
              v-model="form.password"
              type="password"
              required
              class="bg-gray-700 border border-gray-600 rounded w-full px-4 py-3 mt-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          </label>

          <label class="block">
            Status
            <select
              v-model="form.status"
              class="bg-gray-700 border border-gray-600 rounded w-full px-4 py-3 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            >
              <option value="active" class="text-black">Ativo</option>
              <option value="inactive" class="text-black">Inativo</option>
            </select>
          </label>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-5 py-3 rounded border border-gray-600 hover:bg-gray-700 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded font-semibold transition"
            >
              {{ isEditing ? 'Salvar' : 'Cadastrar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore, User } from '@/stores/user';
import { v4 as uuidv4 } from 'uuid';

const userStore = useUserStore();

const searchName = ref('');
const filterStatus = ref<'all' | 'active' | 'inactive'>('all');
const alertMessage = ref('');
const alertType = ref<'success' | 'error'>('success');

const showModal = ref(false);
const isEditing = ref(false);

const form = ref<User>({
  id: '',
  name: '',
  document: '',
  password: '',
  status: 'active',
});

const filteredUsers = computed(() => {
  return userStore.filterUsers(searchName.value, filterStatus.value);
});

function resetForm() {
  form.value = {
    id: '',
    name: '',
    document: '',
    password: '',
    status: 'active',
  };
}

function openModalForNewUser() {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
}

function openModalForEditUser(user: User) {
  form.value = { ...user, password: '' };
  isEditing.value = true;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  alertMessage.value = '';
}

function submitForm() {
  if (isEditing.value) {
    // Cria uma cópia do form
    const updatedUser = { ...form.value };

    // Se a senha estiver vazia no form, mantém a senha original do usuário
    if (!updatedUser.password) {
      const originalUser = userStore.users.find(u => u.id === updatedUser.id);
      if (originalUser) {
        updatedUser.password = originalUser.password;
      }
    }

    const success = userStore.editUser(updatedUser);
    if (success) {
      alertMessage.value = 'Usuário atualizado com sucesso!';
      alertType.value = 'success';
      showModal.value = false;
    } else {
      alertMessage.value = 'Erro ao atualizar usuário.';
      alertType.value = 'error';
    }
  } else {
    form.value.id = uuidv4();
    if (!form.value.password) {
      alertMessage.value = 'Senha é obrigatória!';
      alertType.value = 'error';
      return;
    }
    const success = userStore.registerUser(form.value);
    if (success) {
      alertMessage.value = 'Usuário cadastrado com sucesso!';
      alertType.value = 'success';
      showModal.value = false;
    } else {
      alertMessage.value = 'Documento já cadastrado!';
      alertType.value = 'error';
    }
  }
}

function confirmDeactivate(user: User) {
  if (confirm(`Deseja realmente desativar o usuário ${user.name}?`)) {
    const success = userStore.deactivateUser(user.id);
    if (success) {
      alertMessage.value = 'Usuário desativado com sucesso!';
      alertType.value = 'success';
    } else {
      alertMessage.value = 'Erro ao desativar usuário.';
      alertType.value = 'error';
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>