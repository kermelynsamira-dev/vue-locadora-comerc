// import { mount } from '@vue/test-utils';
// import { describe, it, expect, vi } from 'vitest';
// import ClientList from '@/components/pages/ClientList.vue';
// import { useClientStore } from '@/stores/client';

// vi.mock('@/stores/client', () => ({
//   useClientStore: vi.fn(),
// }));

// describe('ClientList.vue', () => {
//   const mockClients = [
//     {
//       id: '1',
//       firstName: 'Kermelyn',
//       lastName: 'Samira',
//       cpf: '12345678901',
//       email: 'kermy@example.com',
//       phone: '11999999999',
//       status: 'active',
//       address: {
//         cep: '01001000',
//         street: 'Rua A',
//         neighborhood: 'Bairro B',
//         city: 'Cidade C',
//         uf: 'SP',
//       },
//     },
//   ];

//   it('renders clients in table', () => {
//     (useClientStore as any).mockReturnValue({
//       filteredClients: () => mockClients,
//       loadFromStorage: vi.fn(),
//       softDeleteClient: vi.fn(),
//     });

//     const wrapper = mount(ClientList);
//     expect(wrapper.text()).toContain('Kermelyn Samira');
//     expect(wrapper.text()).toContain('12345678901');
//     expect(wrapper.text()).toContain('kermy@example.com');
//   });

//   it('calls softDeleteClient on Desativar button click', async () => {
//     const softDeleteClientMock = vi.fn();
//     (useClientStore as any).mockReturnValue({
//       filteredClients: () => mockClients,
//       loadFromStorage: vi.fn(),
//       softDeleteClient: softDeleteClientMock,
//     });

//     const wrapper = mount(ClientList);
//     await wrapper.find('button:text("Desativar")').trigger('click');
//     expect(softDeleteClientMock).toHaveBeenCalledWith('1');
//   });
// });
