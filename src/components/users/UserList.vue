<template>
  <div class="space-y-6">
    <!-- Filtros -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex flex-col md:flex-row gap-4 flex-grow">
        <input
          v-model="searchName"
          type="text"
          placeholder="Buscar por nome..."
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 w-full md:w-[3]"
        />
        <select
          v-model="filterStatus"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white w-full md:w-48"
        >
          <option value="all" class="text-black">Todos</option>
          <option value="active" class="text-black">Ativos</option>
          <option value="inactive" class="text-black">Inativos</option>
        </select>
      </div>

      <button
        @click="openModalForNewUser"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg shadow transition w-full md:w-auto"
      >
        + Novo Usuário
      </button>
    </div>

    <!-- Alertas -->
    <div
      v-if="alertMessage"
      :class="[
        'p-3 rounded-md font-medium text-center text-white shadow transition',
        alertType === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
    >
      {{ alertMessage }}
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full text-sm text-left">
        <thead>
          <tr class="bg-red-700 text-white">
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Nome</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Documento</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Status</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="bg-white text-gray-800 border-b border-gray-200 hover:bg-red-100 transition"
          >
            <td class="p-4 font-medium border-r border-gray-100">{{ user.name }}</td>
            <td class="p-4 lowercase border-r border-gray-100">{{ user.document }}</td>
            <td class="p-4 capitalize flex items-center gap-2 border-r border-gray-100">
              <Check v-if="user.status === 'active'" class="text-green-600 w-4 h-4" />
              <X v-else class="text-gray-500 w-4 h-4" />
              <span :class="user.status === 'active' ? 'text-green-600' : 'text-gray-500'">
                {{ user.status }}
              </span>
            </td>
            <td class="p-4 text-center">
              <button
                @click.stop="openModalForEditUser(user)"
                class="text-blue-600 hover:underline font-semibold mr-3"
              >
                Editar
              </button>
              <button
                @click.stop="confirmDeactivate(user)"
                :disabled="user.status === 'inactive'"
                :class="user.status === 'inactive'
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-red-600 hover:underline font-semibold'"
              >
                Desativar
              </button>
            </td>
          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td colspan="4" class="text-center p-6 text-gray-500 italic">
              Nenhum usuário encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UserForm
      v-if="showModal"
      :user="form"
      :is-editing="isEditing"
      @close="closeModal"
      @submit="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore, type User } from '@/stores/user';
import { v4 as uuidv4 } from 'uuid';
import UserForm from "@/components/users/UserForm.vue";
import { Check, X } from 'lucide-vue-next';

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
  form.value = JSON.parse(JSON.stringify(user)); // cópia profunda para evitar vazamento reativo
  form.value.password = '';
  isEditing.value = true;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  alertMessage.value = '';
}

function submitForm(updated: User) {
  if (isEditing.value) {
    // Se a senha estiver vazia, não sobrescreve a senha no store
    if (!updated.password) {
      delete updated.password;
    }
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
