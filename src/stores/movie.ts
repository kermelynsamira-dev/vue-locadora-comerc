import { defineStore } from 'pinia';
import type { Movie } from '@/types/movie';

const API_KEY = 'your_api_key'; // substitua pela sua chave OMDb

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Movie[],
    loading: false,
    error: '',
  }),

  actions: {
    async searchMovies(title: string, year?: string) {
      this.loading = true;
      this.error = '';
      try {
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}&type=movie`;
        if (year) {
          url += `&y=${year}`;
        }
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === 'True') {
          this.movies = data.Search;
        } else {
          this.movies = [];
          this.error = data.Error || 'Nenhum filme encontrado.';
        }
      } catch (err) {
        this.error = 'Erro ao buscar filmes.';
      } finally {
        this.loading = false;
      }
    },
  },
});
