// // tests/components/rentals/RentalForm.spec.ts
// import { mount } from '@vue/test-utils';
// import RentalForm from '@/components/rentals/RentalForm.vue';
// import { nextTick } from 'vue';

// describe('RentalForm.vue', () => {
//   let wrapper: ReturnType<typeof mount>;

//   beforeEach(() => {
//     wrapper = mount(RentalForm, {
//       props: {
//         rentalToEdit: null,
//         isEditing: false,
//       },
//       global: {
//         // mocks stores if necessary
//         mocks: {
//           // mock any store methods if your RentalForm uses them internally
//         },
//       },
//     });
//   });

//   it('renderiza campos básicos do formulário de locação', () => {
//     expect(wrapper.find('select').exists()).toBe(true);
//     expect(wrapper.find('input[type="date"]').exists()).toBe(true);
//   });

//   it('exibe erro se não preencher todos os campos', async () => {
//     await wrapper.find('form').trigger('submit.prevent');
//     expect(wrapper.text()).toContain('Preencha todos os campos.');
//   });

//   it('atualiza o formulário ao preencher campos', async () => {
//     const clientSelect = wrapper.find('select[v-model="form.clientId"]');
//     await clientSelect.setValue('client1');
//     expect(wrapper.vm.form.clientId).toBe('client1');

//     const movieSelect = wrapper.find('select[multiple]');
//     await movieSelect.setValue(['movie1', 'movie2']);
//     expect(wrapper.vm.form.movieIds).toEqual(['movie1', 'movie2']);

//     const rentalDateInput = wrapper.find('input[type="date"]:nth-of-type(1)');
//     await rentalDateInput.setValue('2025-07-24');
//     expect(wrapper.vm.form.rentalDate).toBe('2025-07-24');

//     const returnDateInput = wrapper.find('input[type="date"]:nth-of-type(2)');
//     await returnDateInput.setValue('2025-07-30');
//     expect(wrapper.vm.form.returnDate).toBe('2025-07-30');
//   });

//   it('emite "saved" após salvar com dados válidos', async () => {
//     // preencher dados
//     await wrapper.setData({
//       form: {
//         clientId: 'client1',
//         movieIds: ['movie1', 'movie2'],
//         rentalDate: '2025-07-24',
//         returnDate: '2025-07-30',
//       },
//     });

//     await wrapper.find('form').trigger('submit.prevent');
//     await nextTick();

//     expect(wrapper.emitted()).toHaveProperty('saved');
//   });
// });
