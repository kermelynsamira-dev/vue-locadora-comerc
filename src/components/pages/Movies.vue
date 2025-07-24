<template>
  <div class="min-h-screen flex items-center justify-center text-white font-montserrat px-4">
  <div class="max-w-5xl min-w-[400px] bg-black/70 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-red-700 max-h-[80vh] overflow-y-auto">
      
    <h1 class="text-4xl font-extrabold mb-6 text-red-500 text-center tracking-wide">
        Buscar Filmes
      </h1>

      <!-- Formulário de busca -->
      <form @submit.prevent="search" class="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          v-model="title"
          placeholder="Título"
          class="flex-1 p-3 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring focus:ring-red-500/40"
          required
        />
        <input
          v-model="year"
          placeholder="Ano"
          maxlength="4"
          class="w-24 p-3 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring focus:ring-red-500/40"
          pattern="\d{4}"
          title="Digite um ano válido de 4 dígitos"
        />
        <button
          type="submit"
          class="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold shadow transition"
        >
          Buscar
        </button>
      </form>

      <!-- Feedback de carregamento e erro -->
      <div v-if="movieStore.loading" class="text-center text-gray-300 mb-6">
        Carregando...
      </div>
      <div v-else-if="movieStore.error" class="text-center text-red-600 mb-6">
        {{ movieStore.error }}
      </div>

      <!-- Grid de filmes -->
      <div
        v-if="movieStore.movies.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <div
          v-for="movie in movieStore.movies"
          :key="movie.imdbID"
          class="bg-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4 hover:scale-[1.03] transition-transform cursor-pointer"
          :title="movie.Title"
        >
          <img
            :src="movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'"
            alt="Poster do filme"
            class="w-40 h-60 object-cover rounded-md mb-4"
          />
          <h3 class="text-lg font-semibold text-center truncate w-full">
            {{ movie.Title }}
          </h3>
          <p class="text-sm text-gray-400 mt-1">{{ movie.Year }}</p>
        </div>
      </div>

      <!-- Mensagem quando não encontrar filmes -->
      <div v-else class="text-center text-gray-500 mt-8 italic">
        Nenhum filme encontrado.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';

const title = ref('');
const year = ref('');

const movieStore = useMovieStore();

onMounted(() => {
  movieStore.loadFromStorage();
});

function search() {
  if (title.value.trim()) {
    movieStore.searchMovies(title.value, year.value);
  }
}
</script>
