// import { mount } from '@vue/test-utils';
// import { describe, it, expect, vi } from 'vitest';
// import UserList from '@/components/pages/UserList.vue';
// import { useUserStore } from '@/stores/user';

// vi.mock('@/stores/user', () => ({
//   useUserStore: vi.fn(),
// }));

// describe('UserList.vue', () => {
//   const mockUsers = [
//     {
//       id: 'u1',
//       name: 'Admin User',
//       document: '12345678900',
//       password: 'secret',
//       status: 'active',
//     },
//   ];

//   it('renders user list', () => {
//     (useUserStore as any).mockReturnValue({
//       filteredUsers: () => mockUsers,
//       loadUsers: vi.fn(),
//       softDeleteUser: vi.fn(),
//     });

//     const wrapper = mount(UserList);
//     expect(wrapper.text()).toContain('Admin User');
//     expect(wrapper.text()).toContain('12345678900');
//   });

//   it('calls softDeleteUser on desativar button click', async () => {
//     const softDeleteUserMock = vi.fn();
//     (useUserStore as any).mockReturnValue({
//       filteredUsers: () => mockUsers,
//       loadUsers: vi.fn(),
//       softDeleteUser: softDeleteUserMock,
//     });

//     const wrapper = mount(UserList);
//     await wrapper.find('button:text("Desativar")').trigger('click');
//     expect(softDeleteUserMock).toHaveBeenCalledWith('u1');
//   });
// });
