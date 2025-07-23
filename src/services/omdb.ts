const API_KEY = '2b62248'; 
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export async function fetchMovies(title: string, year?: string): Promise<Movie[]> {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${title}&type=movie`;

    if (year) url += `&y=${year}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'False') return [];

    return data.Search;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
}