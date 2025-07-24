<template>
  <div class="min-h-screen flex items-center justify-center text-white font-montserrat px-4">
    <div
      class="w-full max-w-5xl bg-black/70 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-red-700"
    >
      <h1
        class="text-4xl font-extrabold mb-6 tracking-wide text-red-500 text-center"
      >
        Gestão de Clientes
      </h1>

      <!-- Lista e formulário separados -->
      <ClientList 
        @edit-client="openModalForEditClient" 
        @soft-delete-client="softDeleteClient" 
        @new-client="openModalForNewClient"
      />

      <ClientForm
        v-if="showModal"
        :clientToEdit="form"
        :isEditing="isEditing"
        @close="showModal = false"
        @saved="showModal = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClientStore, type Client } from '@/stores/client';
import ClientList from '@/components/clients/ClientList.vue';
import ClientForm from '@/components/clients/ClientForm.vue';

const clientStore = useClientStore();

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

// Função para abrir modal com dados do cliente para edição
function openModalForEditClient(client: Client) {
  form.value = { ...client };
  isEditing.value = true;
  showModal.value = true;
}

// Função para desativar cliente (soft delete)
function softDeleteClient(id: string) {
  clientStore.softDeleteClient(id);
}

// Função para abrir modal para novo cliente (formulário limpo)
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
</script>
