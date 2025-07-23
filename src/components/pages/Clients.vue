<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Clientes</h1>
      <button @click="openForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Novo Cliente
      </button>
    </div>

    <ClientList 
      @edit-client="editClient" 
      @soft-delete-client="softDeleteClient" 
    />

    <ClientForm 
      v-if="showForm" 
      :clientToEdit="clientToEdit" 
      @close="closeForm" 
      @saved="onSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClientStore } from '@/stores/client';
import ClientList from '@/components/clients/ClientList.vue';
import ClientForm from '@/components/clients/ClientForm.vue';
import type { Client } from '@/stores/client';

const clientStore = useClientStore();

const showForm = ref(false);
const clientToEdit = ref<Client | null>(null);

function openForm() {
  clientToEdit.value = null;
  showForm.value = true;
}

function editClient(client: Client) {
  clientToEdit.value = client;
  showForm.value = true;
}

function softDeleteClient(id: string) {
  clientStore.softDeleteClient(id);
}

function closeForm() {
  showForm.value = false;
}

function onSaved() {
  showForm.value = false;
}
</script>
