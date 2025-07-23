<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Buscar Filmes</h1>
    
    <div class="flex gap-4 mb-4">
      <input v-model="title" placeholder="Título" class="border rounded p-2 flex-1" />
      <input v-model="year" placeholder="Ano" maxlength="4" class="border rounded p-2 w-32" />
      <button @click="search" class="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Buscar</button>
    </div>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="movie in movies" :key="movie.imdbID" class="border rounded p-4 flex flex-col items-center text-center">
        <img :src="movie.Poster" alt="Poster" class="w-40 h-60 object-cover mb-2" />
        <h3 class="font-semibold">{{ movie.Title }}</h3>
        <p class="text-sm text-gray-600">{{ movie.Year }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movie';

const title = ref('');
const year = ref('');
const { searchMovies, movies, loading, error } = useMovieStore();

function search() {
  if (title.value.trim()) {
    searchMovies(title.value, year.value);
  }
}
</script>
