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

    <RentalList />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRentalStore } from '@/stores/rental';
import { useClientStore } from '@/stores/client';
import RentalForm from '@/components/rentals/RentalForm.vue';
import RentalList from '@/components/rentals/RentalList.vue';

const rentalStore = useRentalStore();
const clientStore = useClientStore();

const showForm = ref(false);

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
