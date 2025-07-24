// src/stores/rental.ts
import { defineStore } from 'pinia';

export interface Rental {
  id: string;
  clientId: string;
  movieTitles: string[];
  rentalDate: string;
  returnDate: string;
  userId: string;
  status: 'alugado' | 'entregue';
}

export const useRentalStore = defineStore('rental', {
  state: () => ({
    rentals: [] as Rental[],
  }),

  actions: {
    loadRentals() {
      const data = localStorage.getItem('rentals');
      if (data) {
        this.rentals = JSON.parse(data);
      }
    },

    saveRentals() {
      localStorage.setItem('rentals', JSON.stringify(this.rentals));
    },

    addRental(rental: Rental) {
      this.rentals.push(rental);
      this.saveRentals();
    },

    updateRentalStatus(id: string, newStatus: 'alugado' | 'entregue') {
      const rental = this.rentals.find(r => r.id === id);
      if (rental) {
        rental.status = newStatus;
        this.saveRentals();
      }
    }
  }
});
