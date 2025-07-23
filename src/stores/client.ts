import { defineStore } from 'pinia';

export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    phone: string;
    address: {
      cep: string;
      street: string;
      neighborhood: string;
      city: string;
      uf: string;
    };
    status: 'active' | 'inactive';
  }  

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [] as Client[],
  }),
  getters: {
    filteredClients: (state) => (search: string, filterStatus: string) => {
      let filtered = state.clients;

      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(c =>
          c.firstName.toLowerCase().includes(s) ||
          c.lastName.toLowerCase().includes(s) ||
          c.cpf.includes(search)
        );
      }

      if (filterStatus && filterStatus !== 'all') {
        filtered = filtered.filter(c => c.status === filterStatus);
      }

      return filtered;
    }
  },
  actions: {
    loadClients() {
      const data = localStorage.getItem('clients');
      if (data) this.clients = JSON.parse(data);
    },
    saveClients() {
      localStorage.setItem('clients', JSON.stringify(this.clients));
    },
    addClient(client: Client) {
      this.clients.push(client);
      this.saveClients();
    },
    updateClient(updatedClient: Client) {
      const index = this.clients.findIndex(c => c.id === updatedClient.id);
      if (index !== -1) {
        this.clients[index] = updatedClient;
        this.saveClients();
      }
    },
    softDeleteClient(id: string) {
      const client = this.clients.find(c => c.id === id);
      if (client) {
        client.status = 'inactive';
        this.saveClients();
      }
    }
  }
});
