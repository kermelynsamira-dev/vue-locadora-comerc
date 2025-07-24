<template>
  <div class="space-y-6">
    <!-- Filtros + Botão lado a lado -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex flex-col md:flex-row gap-4 flex-grow">
        <input
          v-model="filters.client"
          type="text"
          placeholder="Buscar por cliente"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 w-full"
        />
        <input
          v-model="filters.rentalDate"
          type="date"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white w-full"
        />
        <input
          v-model="filters.returnDate"
          type="date"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white w-full"
        />
      </div>

      <!-- Botão -->
      <button
        @click="$emit('new-rental')"
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg shadow transition w-full md:w-auto"
      >
        + Nova Locação
      </button>
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full text-sm text-left">
        <thead>
          <tr class="bg-red-700 text-white">
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Cliente</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Filmes</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Data Aluguel</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Data Entrega</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm border-r border-white/20">Status</th>
            <th class="p-4 font-bold uppercase tracking-wider text-sm text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="rental in filteredRentals"
            :key="rental.id"
            class="bg-white text-gray-800 border-b border-gray-200 hover:bg-red-100 transition"
          >
            <td class="p-4 border-r border-gray-100">{{ getClientName(rental.clientId) }}</td>
            <td class="p-4 border-r border-gray-100">{{ rental.movieTitles.join(', ') }}</td>
            <td class="p-4 border-r border-gray-100">{{ rental.rentalDate }}</td>
            <td class="p-4 border-r border-gray-100">{{ rental.returnDate || '-' }}</td>
            <td class="p-4 border-r border-gray-100">
              <span :class="rental.status === 'alugado' ? 'text-yellow-600' : 'text-green-600'">
                {{ rental.status === 'alugado' ? 'Alugado' : 'Entregue' }}
              </span>
            </td>
            <td class="p-4 text-center">
              <button
                v-if="rental.status === 'alugado'"
                @click="markAsReturned(rental.id)"
                class="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Marcar como Entregue
              </button>
              <button
                @click="$emit('edit-rental', rental)"
                class="ml-3 text-blue-600 hover:underline font-semibold"
              >
                Editar
              </button>
            </td>
          </tr>

          <tr v-if="filteredRentals.length === 0">
            <td colspan="6" class="text-center p-6 text-gray-500 italic">
              Nenhuma locação encontrada.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRentalStore } from '@/stores/rental';
import { useClientStore } from '@/stores/client';

const rentalStore = useRentalStore();
const clientStore = useClientStore();

const filters = ref({
  client: '',
  rentalDate: '',
  returnDate: '',
});

const filteredRentals = computed(() => {
  return rentalStore.rentals.filter(r => {
    const clientName = getClientName(r.clientId).toLowerCase();
    const matchesClient = clientName.includes(filters.value.client.toLowerCase());
    const matchesRentalDate = !filters.value.rentalDate || r.rentalDate === filters.value.rentalDate;
    const matchesReturnDate = !filters.value.returnDate || r.returnDate === filters.value.returnDate;
    return matchesClient && matchesRentalDate && matchesReturnDate;
  });
});

function getClientName(clientId: string): string {
  const client = clientStore.clients.find(c => c.id === clientId);
  return client ? `${client.firstName} ${client.lastName}` : 'Desconhecido';
}

function markAsReturned(id: string) {
  rentalStore.updateRentalStatus(id, 'entregue');
}

onMounted(() => {
  rentalStore.loadRentals();
  clientStore.loadClients();
});
</script>
