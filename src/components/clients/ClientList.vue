<template>
    <div>
      <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Buscar por nome ou CPF" 
          class="border p-2 rounded w-full md:w-1/3"
        />
        <select v-model="filterStatus" class="border p-2 rounded w-full md:w-1/5">
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
      </div>
  
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2 text-left">Nome</th>
            <th class="border p-2 text-left">CPF</th>
            <th class="border p-2 text-left">Email</th>
            <th class="border p-2 text-left">Celular</th>
            <th class="border p-2 text-left">Status</th>
            <th class="border p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ client.firstName }} {{ client.lastName }}</td>
            <td class="border p-2">{{ client.cpf }}</td>
            <td class="border p-2">{{ client.email }}</td>
            <td class="border p-2">{{ client.phone }}</td>
            <td class="border p-2 capitalize">{{ client.status }}</td>
            <td class="border p-2 text-center">
              <button 
                @click="$emit('edit-client', client)" 
                class="text-blue-600 hover:underline mr-2"
              >
                Editar
              </button>
              <button 
                @click="$emit('soft-delete-client', client.id)" 
                class="text-red-600 hover:underline"
                :disabled="client.status === 'inactive'"
              >
                Desativar
              </button>
            </td>
          </tr>
          <tr v-if="filteredClients.length === 0">
            <td colspan="6" class="text-center p-4 text-gray-500">Nenhum cliente encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useClientStore } from '@/stores/client';
  
  const search = ref('');
  const filterStatus = ref('all');
  
  const clientStore = useClientStore();
  
  onMounted(() => {
    clientStore.loadClients();
  });
  
  const filteredClients = computed(() => {
    return clientStore.filteredClients(search.value, filterStatus.value);
  });
  </script>
  