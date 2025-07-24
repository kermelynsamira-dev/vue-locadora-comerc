// import { mount } from '@vue/test-utils';
// import { describe, it, expect, vi } from 'vitest';
// import Movies from '@/components/pages/Movies.vue';
// import { useMovieStore } from '@/stores/movie';

// vi.mock('@/stores/movie', () => ({
//   useMovieStore: vi.fn(),
// }));

// describe('Movies.vue', () => {
//   it('renders search inputs and button', () => {
//     const wrapper = mount(Movies);
//     expect(wrapper.find('input[placeholder="Título"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="Ano"]').exists()).toBe(true);
//     expect(wrapper.find('button').text()).toMatch(/buscar/i);
//   });

//   it('calls searchMovies with title and year', async () => {
//     const searchMoviesMock = vi.fn();
//     (useMovieStore as any).mockReturnValue({
//       movies: [],
//       loading: false,
//       error: '',
//       searchMovies: searchMoviesMock,
//       loadFromStorage: vi.fn(),
//     });

//     const wrapper = mount(Movies);
//     await wrapper.find('input[placeholder="Título"]').setValue('Matrix');
//     await wrapper.find('input[placeholder="Ano"]').setValue('1999');
//     await wrapper.find('button').trigger('click');

//     expect(searchMoviesMock).toHaveBeenCalledWith('Matrix', '1999');
//   });

//   it('displays movies list', () => {
//     const mockMovies = [
//       { imdbID: 'tt0133093', Title: 'The Matrix', Year: '1999', Poster: 'url1' },
//       { imdbID: 'tt0234215', Title: 'Matrix Reloaded', Year: '2003', Poster: 'url2' },
//     ];

//     (useMovieStore as any).mockReturnValue({
//       movies: mockMovies,
//       loading: false,
//       error: '',
//       searchMovies: vi.fn(),
//       loadFromStorage: vi.fn(),
//     });

//     const wrapper = mount(Movies);
//     expect(wrapper.text()).toContain('The Matrix');
//     expect(wrapper.text()).toContain('Matrix Reloaded');
//   });
// });
