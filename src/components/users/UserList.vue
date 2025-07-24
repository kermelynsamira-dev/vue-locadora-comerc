<template>
    <div>
      <!-- Filtros -->
      <div class="flex flex-wrap gap-4 mb-6 items-center">
        <input v-model="searchName" type="text" placeholder="Buscar por nome..." class="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-500 flex-grow" />
        <select v-model="filterStatus" class="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white">
          <option value="all" class="text-black">Todos</option>
          <option value="active" class="text-black">Ativos</option>
          <option value="inactive" class="text-black">Inativos</option>
        </select>
        <button @click="openModalForNewUser" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded">
          + Novo Usuário
        </button>
      </div>
  
      <!-- Alertas -->
      <div v-if="alertMessage" :class="[ 'mb-4 p-3 rounded text-white', alertType === 'success' ? 'bg-green-600' : 'bg-red-600' ]">
        {{ alertMessage }}
      </div>
  
      <!-- Tabela -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-700 text-white min-w-[600px]">
          <thead>
            <tr class="bg-red-700">
              <th class="border p-3 text-left">Nome</th>
              <th class="border p-3 text-left">Documento</th>
              <th class="border p-3 text-left">Status</th>
              <th class="border p-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-red-800">
              <td class="border p-3">{{ user.name }}</td>
              <td class="border p-3">{{ user.document }}</td>
              <td class="border p-3 capitalize">{{ user.status }}</td>
              <td class="border p-3 text-center">
                <button @click.stop="openModalForEditUser(user)" class="text-red-300 hover:text-white mr-2">Editar</button>
                <button @click.stop="confirmDeactivate(user)" :disabled="user.status === 'inactive'" :class="user.status === 'inactive' ? 'text-gray-500 cursor-not-allowed' : 'text-red-300 hover:text-white'">
                  Desativar
                </button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="4" class="text-center p-4 text-gray-400">Nenhum usuário encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <UserForm v-if="showModal" :user="form" :is-editing="isEditing" @close="closeModal" @submit="submitForm" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useUserStore, type User } from '@/stores/user';
  import { v4 as uuidv4 } from 'uuid';
  import UserForm from "@/components/users/UserForm.vue";
 
  const userStore = useUserStore();
  const searchName = ref('');
  const filterStatus = ref<'all' | 'active' | 'inactive'>('all');
  const alertMessage = ref('');
  const alertType = ref<'success' | 'error'>('success');
  const showModal = ref(false);
  const isEditing = ref(false);
  
  const form = ref<User>({ id: '', name: '', document: '', password: '', status: 'active' });
  
  const filteredUsers = computed(() => userStore.filterUsers(searchName.value, filterStatus.value));
  
  function openModalForNewUser() {
    form.value = { id: '', name: '', document: '', password: '', status: 'active' };
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
  
  function submitForm(updated: User) {
    if (isEditing.value) {
      const success = userStore.editUser(updated);
      alertMessage.value = success ? 'Usuário atualizado!' : 'Erro ao atualizar.';
      alertType.value = success ? 'success' : 'error';
    } else {
      updated.id = uuidv4();
      if (!updated.password) {
        alertMessage.value = 'Senha obrigatória!';
        alertType.value = 'error';
        return;
      }
      const success = userStore.registerUser(updated);
      alertMessage.value = success ? 'Usuário cadastrado!' : 'Documento já existe!';
      alertType.value = success ? 'success' : 'error';
    }
    showModal.value = false;
  }
  
  function confirmDeactivate(user: User) {
    if (confirm(`Deseja desativar ${user.name}?`)) {
      const success = userStore.deactivateUser(user.id);
      alertMessage.value = success ? 'Usuário desativado!' : 'Erro ao desativar.';
      alertType.value = success ? 'success' : 'error';
    }
  }
  </script>
  