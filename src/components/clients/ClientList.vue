<template>
  <div class="space-y-6">
    <!-- Filtros + Botão lado a lado -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex flex-col md:flex-row gap-4 flex-grow">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar por nome ou CPF"
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

      <!-- Botão + Novo Cliente aqui -->
      <button
        @click="openModalForNewClient"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg shadow transition w-full md:w-auto"
      >
        + Novo Cliente
      </button>
    </div>

    <!-- Alertas -->
    <div
      v-if="alertMessage"
      :class="[
        'p-3 rounded-md font-medium text-center text-white shadow transition',
        alertType === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
      role="alert"
    >
      {{ alertMessage }}
    </div>

    <!-- Tabela de clientes -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full text-sm text-left">
        <thead>
          <tr class="bg-red-700 text-white">
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Nome</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">CPF</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Email</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Celular</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Status</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in filteredClients"
            :key="client.id"
            class="bg-white text-gray-800 border-b border-gray-200 hover:bg-red-100 transition"
          >
            <td class="p-4 font-medium border-r border-gray-100">
              {{ client.firstName }} {{ client.lastName }}
            </td>
            <td class="p-4 border-r border-gray-100">{{ client.cpf }}</td>
            <td class="p-4 border-r border-gray-100">{{ client.email }}</td>
            <td class="p-4 border-r border-gray-100">{{ client.phone }}</td>
            <td
              class="p-4 capitalize flex items-center gap-2 border-r border-gray-100"
              :class="client.status === 'active' ? 'text-green-600' : 'text-gray-500'"
            >
              <Check v-if="client.status === 'active'" class="w-4 h-4" />
              <X v-else class="w-4 h-4" />
              <span>{{ client.status }}</span>
            </td>
            <td class="p-4 text-center">
              <button
                @click="openModalForEditClient(client)"
                class="text-blue-600 hover:underline font-semibold mr-3"
              >
                Editar
              </button>
              <button
                @click="softDeleteClient(client.id)"
                :disabled="client.status === 'inactive'"
                :class="client.status === 'inactive'
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-red-600 hover:underline font-semibold'"
              >
                Desativar
              </button>
            </td>
          </tr>

          <!-- Quando não há clientes -->
          <tr v-if="filteredClients.length === 0">
            <td colspan="6" class="text-center p-6 text-gray-500 italic">
              Nenhum cliente encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal do formulário -->
    <ClientForm
      v-if="showModal"
      :clientToEdit="form"
      :isEditing="isEditing"
      @close="showModal = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Check, X } from 'lucide-vue-next';
import { useClientStore, type Client } from '@/stores/client';
import ClientForm from '@/components/clients/ClientForm.vue';

const clientStore = useClientStore();

const search = ref('');
const filterStatus = ref<'all' | 'active' | 'inactive'>('all');

const alertMessage = ref('');
const alertType = ref<'success' | 'error'>('success');

const showModal = ref(false);
const isEditing = ref(false);

const form = ref<Client>({
  id: '',
  firstName: '',
  lastName: '',
  cpf: '',
  email: '',
  phone: '',
  address: {
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    uf: '',
  },
  status: 'active',
});

// Carrega clientes do localStorage ao montar
onMounted(() => {
  clientStore.loadFromStorage();
});

// Computed para filtrar clientes conforme busca e status
const filteredClients = computed(() => {
  return clientStore.filteredClients(search.value, filterStatus.value);
});

// Abre modal para criar cliente novo (limpa form)
function openModalForNewClient() {
  form.value = {
    id: '',
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      uf: '',
    },
    status: 'active',
  };
  isEditing.value = false;
  showModal.value = true;
}

// Abre modal para editar cliente existente (copia dados)
function openModalForEditClient(client: Client) {
  form.value = { ...client };
  isEditing.value = true;
  showModal.value = true;
}

// Marca cliente como desativado (soft delete)
function softDeleteClient(id: string) {
  clientStore.softDeleteClient(id);
  alertMessage.value = 'Cliente desativado!';
  alertType.value = 'success';

  // Limpa alerta após 3 segundos
  setTimeout(() => {
    alertMessage.value = '';
  }, 3000);
}

// Após salvar cliente, fecha modal e mostra alerta
function handleSaved() {
  showModal.value = false;
  alertMessage.value = 'Cliente salvo com sucesso!';
  alertType.value = 'success';

  // Limpa alerta após 3 segundos
  setTimeout(() => {
    alertMessage.value = '';
  }, 3000);
}
</script>
