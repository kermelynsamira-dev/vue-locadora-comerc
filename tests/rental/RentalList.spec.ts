// import { mount } from '@vue/test-utils';
// import { describe, it, expect, vi } from 'vitest';
// import RentalList from '@/components/pages/RentalList.vue';
// import { useRentalStore } from '@/stores/rental';
// import { useClientStore } from '@/stores/client';

// vi.mock('@/stores/rental', () => ({
//   useRentalStore: vi.fn(),
// }));

// vi.mock('@/stores/client', () => ({
//   useClientStore: vi.fn(),
// }));

// describe('RentalList.vue', () => {
//   const mockRentals = [
//     {
//       id: 'r1',
//       clientId: '1',
//       movieTitles: ['Matrix'],
//       rentalDate: '2025-07-20',
//       returnDate: '',
//       status: 'alugado',
//       userId: 'u1',
//     },
//   ];

//   const mockClients = [
//     {
//       id: '1',
//       firstName: 'Kermelyn',
//       lastName: 'Samira',
//     },
//   ];

//   it('renders rentals with client name', () => {
//     (useRentalStore as any).mockReturnValue({
//       rentals: mockRentals,
//       loadRentals: vi.fn(),
//       updateRentalStatus: vi.fn(),
//     });
//     (useClientStore as any).mockReturnValue({
//       clients: mockClients,
//       loadClients: vi.fn(),
//     });

//     const wrapper = mount(RentalList);
//     expect(wrapper.text()).toContain('Kermelyn Samira');
//     expect(wrapper.text()).toContain('Matrix');
//     expect(wrapper.text()).toContain('Alugado');
//   });

//   it('calls updateRentalStatus on button click', async () => {
//     const updateRentalStatusMock = vi.fn();
//     (useRentalStore as any).mockReturnValue({
//       rentals: mockRentals,
//       loadRentals: vi.fn(),
//       updateRentalStatus: updateRentalStatusMock,
//     });
//     (useClientStore as any).mockReturnValue({
//       clients: mockClients,
//       loadClients: vi.fn(),
//     });

//     const wrapper = mount(RentalList);
//     await wrapper.find('button').trigger('click');
//     expect(updateRentalStatusMock).toHaveBeenCalledWith('r1', 'entregue');
//   });
// });
