// // tests/components/users/UserForm.spec.ts
// import { mount } from '@vue/test-utils';
// import UserForm from '@/components/users/UserForm.vue';

// describe('UserForm.vue', () => {
//   let wrapper: ReturnType<typeof mount>;

//   beforeEach(() => {
//     wrapper = mount(UserForm, {
//       props: {
//         userToEdit: null,
//         isEditing: false,
//       },
//     });
//   });

//   it('renderiza os campos do formulário de usuário', () => {
//     expect(wrapper.find('input[placeholder="Nome"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="Documento"]').exists()).toBe(true);
//     expect(wrapper.find('input[placeholder="Senha"]').exists()).toBe(true);
//     expect(wrapper.find('select').exists()).toBe(true);
//   });

//   it('exibe erro se campos obrigatórios estiverem vazios', async () => {
//     await wrapper.find('form').trigger('submit.prevent');
//     expect(wrapper.text()).toContain('Nome é obrigatório.');
//   });

//   it('atualiza dados do formulário ao digitar', async () => {
//     await wrapper.find('input[placeholder="Nome"]').setValue('Kermelyn');
//     expect(wrapper.vm.form.name).toBe('Kermelyn');
//   });

//   it('emite "saved" ao salvar com dados válidos', async () => {
//     await wrapper.find('input[placeholder="Nome"]').setValue('Kermelyn');
//     await wrapper.find('input[placeholder="Documento"]').setValue('12345678901');
//     await wrapper.find('input[placeholder="Senha"]').setValue('123456');
//     await wrapper.find('select').setValue('active');

//     await wrapper.find('form').trigger('submit.prevent');
//     await new Promise(r => setTimeout(r, 1000));

//     expect(wrapper.emitted()).toHaveProperty('saved');
//   });
// });
