<template>
  <div class="min-h-screen flex items-center justify-center text-white font-montserrat px-4">
    <div class="w-full max-w-5xl bg-black/70 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-red-700">
      <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-500 text-center">Gestão de Locações</h1>

      <RentalList
        @edit-rental="openModalForEditRental"
        @new-rental="openModalForNewRental"
      />

      <RentalForm
        v-if="showModal"
        :rentalToEdit="form"
        :isEditing="isEditing"
        @close="showModal = false"
        @saved="showModal = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRentalStore, type Rental } from '@/stores/rental';
import { useClientStore } from '@/stores/client';
import RentalList from '@/components/rentals/RentalList.vue';
import RentalForm from '@/components/rentals/RentalForm.vue';

const rentalStore = useRentalStore();
const clientStore = useClientStore();

const showModal = ref(false);
const isEditing = ref(false);

const form = ref<Rental>({
  id: '',
  clientId: '',
  movieTitles: [],
  userId: '',
  rentalDate: '',
  returnDate: '',
  status: 'alugado',
});

function openModalForEditRental(rental: Rental) {
  form.value = { ...rental };
  isEditing.value = true;
  showModal.value = true;
}

function openModalForNewRental() {
  form.value = {
    id: '',
    clientId: '',
    movieTitles: [],
    userId: '',
    rentalDate: '',
    returnDate: '',
    status: 'alugado',
  };
  isEditing.value = false;
  showModal.value = true;
}

onMounted(() => {
  rentalStore.loadRentals();
  clientStore.loadClients();
});
</script>
