// // tests/components/clients/ClientForm.spec.ts
// import { mount } from '@vue/test-utils';
// import ClientForm from '@/components/clients/ClientForm.vue';

// describe('ClientForm.vue', () => {
//   let wrapper: ReturnType<typeof mount>;

//   beforeEach(() => {
//     wrapper = mount(ClientForm, {
//       props: {
//         clientToEdit: null,
//         isEditing: false,
//       },
//     });
//   });

//   it('renderiza os campos do formulário', () => {
//     expect(wrapper.find('input[placeholder="Nome"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="Sobrenome"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="CPF"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="Email"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="Celular"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="CEP"]').exists()).toBe(true);
//     expect(wrapper.find('select').exists()).toBe(true);
//   });

//   it('mostra erro ao submeter formulário vazio', async () => {
//     await wrapper.find('form').trigger('submit.prevent');
//     expect(wrapper.text()).toContain('Nome e sobrenome são obrigatórios.');
//   });

//   it('atualiza os dados no form ao digitar', async () => {
//     await wrapper.find('input[placeholder="Nome"]').setValue('Kermelyn');
//     expect(wrapper.vm.form.firstName).toBe('Kermelyn');

//     await wrapper.find('input[placeholder="Sobrenome"]').setValue('Samira');
//     expect(wrapper.vm.form.lastName).toBe('Samira');
//   });

//   it('emite "saved" após salvar com dados válidos', async () => {
//     await wrapper.find('input[placeholder="Nome"]').setValue('Kermelyn');
//     await wrapper.find('input[placeholder="Sobrenome"]').setValue('Samira');
//     await wrapper.find('input[placeholder="CPF"]').setValue('12345678901');
//     await wrapper.find('input[placeholder="Email"]').setValue('kermy@example.com');
//     await wrapper.find('input[placeholder="Celular"]').setValue('11999999999');
//     await wrapper.find('input[placeholder="CEP"]').setValue('01001000');
//     // simula preenchimento do endereço
//     await wrapper.setData({
//       form: {
//         ...wrapper.vm.form,
//         address: {
//           cep: '01001000',
//           street: 'Rua Teste',
//           neighborhood: 'Bairro Teste',
//           city: 'São Paulo',
//           uf: 'SP',
//         },
//       },
//     });
//     await wrapper.find('select').setValue('active');

//     await wrapper.find('form').trigger('submit.prevent');
//     await new Promise(r => setTimeout(r, 1600));

//     expect(wrapper.emitted()).toHaveProperty('saved');
//   });
// });
