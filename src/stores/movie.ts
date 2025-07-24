import { defineStore } from 'pinia';
import type { Movie } from '@/types/movie';

const API_KEY = '2b62248';
const STORAGE_KEY = 'cinecomerc_movies';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [] as Movie[],
    loading: false,
    error: '',
  }),

  actions: {
    loadFromStorage() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.movies = JSON.parse(stored);
      }
    },

    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.movies));
    },

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
          this.saveToStorage();
        } else {
          this.movies = [];
          this.error = data.Error || 'Nenhum filme encontrado.';
          this.saveToStorage();
        }
      } catch (err) {
        this.error = 'Erro ao buscar filmes.';
      } finally {
        this.loading = false;
      }
    },
  },
});
