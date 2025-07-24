<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Locações</h1>
      <button @click="openForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Nova Locação
      </button>
    </div>

    <RentalForm
      v-if="showForm"
      @close="closeForm"
      @saved="onSavedRental"
    />

    <!-- Filtros -->
    <div class="grid md:grid-cols-3 gap-4 mb-4">
      <input v-model="filters.client" type="text" placeholder="Buscar por cliente" class="border p-2 rounded w-full" />
      <input v-model="filters.rentalDate" type="date" class="border p-2 rounded w-full" />
      <input v-model="filters.returnDate" type="date" class="border p-2 rounded w-full" />
    </div>

    <!-- Tabela -->
    <div class="overflow-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4 border">Cliente</th>
            <th class="py-2 px-4 border">Filmes</th>
            <th class="py-2 px-4 border">Data Aluguel</th>
            <th class="py-2 px-4 border">Data Entrega</th>
            <th class="py-2 px-4 border">Status</th>
            <th class="py-2 px-4 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rental in filteredRentals" :key="rental.id">
            <td class="py-2 px-4 border">{{ getClientName(rental.clientId) }}</td>
            <td class="py-2 px-4 border">{{ rental.movieTitles.join(', ') }}</td>
            <td class="py-2 px-4 border">{{ rental.rentalDate }}</td>
            <td class="py-2 px-4 border">{{ rental.returnDate || '-' }}</td>
            <td class="py-2 px-4 border">
              <span :class="rental.status === 'alugado' ? 'text-yellow-600' : 'text-green-600'">
                {{ rental.status === 'alugado' ? 'Alugado' : 'Entregue' }}
              </span>
            </td>
            <td class="py-2 px-4 border">
              <button
                v-if="rental.status === 'alugado'"
                @click="markAsReturned(rental.id)"
                class="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Marcar como Entregue
              </button>
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
import RentalForm from '@/components/rentals/RentalForm.vue';

const rentalStore = useRentalStore();
const clientStore = useClientStore();

const filters = ref({
  client: '',
  rentalDate: '',
  returnDate: '',
});

const showForm = ref(false);

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

function openForm() {
  showForm.value = true;
}
function closeForm() {
  showForm.value = false;
}
function onSavedRental() {
  // Nada necessário aqui por enquanto, o store já atualiza.
}

onMounted(() => {
  rentalStore.loadRentals();
  clientStore.loadClients();
});
</script>
