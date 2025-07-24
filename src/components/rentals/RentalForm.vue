<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg overflow-auto max-h-[90vh]">
      <h2 class="text-xl font-semibold mb-4">Nova Locação</h2>

      <form @submit.prevent="saveRental" class="space-y-4">
        <!-- Cliente -->
        <div>
          <label class="block mb-1 font-medium">Cliente</label>
          <select v-model="form.clientId" required class="w-full border p-2 rounded">
            <option value="" disabled>Selecione o cliente</option>
            <option v-for="client in activeClients" :key="client.id" :value="client.id">
              {{ client.firstName }} {{ client.lastName }} - {{ client.cpf }}
            </option>
          </select>
        </div>

        <!-- Filmes -->
        <div>
          <label class="block mb-1 font-medium">Filmes</label>
          <select v-model="form.movieIds" multiple required class="w-full border p-2 rounded">
            <option v-for="movie in movies" :key="movie.imdbID" :value="movie.imdbID">
              {{ movie.Title }} ({{ movie.Year }})
            </option>
          </select>
        </div>

        <!-- Datas -->
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block mb-1 font-medium">Data de locação</label>
            <input type="date" v-model="form.rentalDate" required class="w-full border p-2 rounded" />
          </div>
          <div class="flex-1">
            <label class="block mb-1 font-medium">Data de entrega</label>
            <input type="date" v-model="form.returnDate" required class="w-full border p-2 rounded" />
          </div>
        </div>

        <!-- Feedback -->
        <div v-if="feedbackMessage" :class="feedbackClass">
          {{ feedbackMessage }}
        </div>

        <!-- Botões -->
        <div class="flex justify-end gap-4 mt-6">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Salvar Locação
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useClientStore } from '@/stores/client';
import { useMovieStore } from '@/stores/movie';
import { useUserStore } from '@/stores/user';
import { useRentalStore } from '@/stores/rental';
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits(['close', 'saved']);

const clientStore = useClientStore();
const movieStore = useMovieStore();
const userStore = useUserStore();
const rentalStore = useRentalStore();

const activeClients = clientStore.clients.filter(c => c.status === 'active');
const movies = movieStore.movies;

const feedbackMessage = ref('');
const feedbackClass = ref('');

const form = reactive({
  clientId: '',
  movieIds: [] as string[],
  rentalDate: '',
  returnDate: '',
});

function saveRental() {
  if (!form.clientId || form.movieIds.length === 0 || !form.rentalDate || !form.returnDate) {
    feedbackMessage.value = 'Preencha todos os campos.';
    feedbackClass.value = 'text-red-600';
    return;
  }

  const selectedTitles = form.movieIds.map(id => {
    const movie = movies.find(m => m.imdbID === id);
    return movie?.Title ?? 'Título desconhecido';
  });

  const rental = {
    id: uuidv4(),
    clientId: form.clientId,
    movieTitles: selectedTitles,
    rentalDate: form.rentalDate,
    returnDate: form.returnDate,
    userId: userStore.currentUser?.id || '',
    status: 'alugado' as const,
  };

  rentalStore.addRental(rental);

  feedbackMessage.value = 'Locação salva com sucesso!';
  feedbackClass.value = 'text-green-600';

  emit('saved');
  emit('close');
}
</script>