// import { mount } from '@vue/test-utils';
// import { describe, it, expect, vi } from 'vitest';
// import Login from '@/components/pages/Login.vue';
// import { useUserStore } from '@/stores/user';

// vi.mock('@/stores/user', () => ({
//   useUserStore: vi.fn(),
// }));

// describe('Login.vue', () => {
//   it('should render inputs and button', () => {
//     const wrapper = mount(Login);
//     expect(wrapper.find('input[type="text"]').exists()).toBe(true);
//     expect(wrapper.find('input[type="password"]').exists()).toBe(true);
//     expect(wrapper.find('button').text()).toMatch(/entrar/i);
//   });

//   it('calls login on submit', async () => {
//     const loginMock = vi.fn().mockResolvedValue(true);
//     (useUserStore as any).mockReturnValue({
//       login: loginMock,
//       currentUser: null,
//     });

//     const wrapper = mount(Login);
//     await wrapper.find('input[type="text"]').setValue('testuser');
//     await wrapper.find('input[type="password"]').setValue('123456');
//     await wrapper.find('form').trigger('submit.prevent');

//     expect(loginMock).toHaveBeenCalledWith('testuser', '123456');
//   });

//   it('shows error on failed login', async () => {
//     const loginMock = vi.fn().mockResolvedValue(false);
//     (useUserStore as any).mockReturnValue({
//       login: loginMock,
//       currentUser: null,
//     });

//     const wrapper = mount(Login);
//     await wrapper.find('input[type="text"]').setValue('testuser');
//     await wrapper.find('input[type="password"]').setValue('wrongpass');
//     await wrapper.find('form').trigger('submit.prevent');

//     // Assuming your component sets an error message like "Invalid credentials"
//     expect(wrapper.text()).toContain('Invalid credentials');
//   });
// });
