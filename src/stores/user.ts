import { defineStore } from 'pinia';

export interface User {
  id: string;
  name: string;
  document: string;
  password: string;
  status: 'active' | 'inactive';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
  }),

  actions: {
    // Carrega os usuários do localStorage ao iniciar
    loadUsersFromStorage() {
      const data = localStorage.getItem('users');
      if (data) {
        this.users = JSON.parse(data);
      }
    },

    // Salva usuários no localStorage
    saveUsersToStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    // Registra um novo usuário
    // Retorna false se já existir usuário com o mesmo documento
    registerUser(user: User): boolean {
      const exists = this.users.some(u => u.document === user.document);
      if (exists) {
        return false; // documento duplicado, falha no cadastro
      }
      this.users.push(user);
      this.saveUsersToStorage();
      return true;
    },

    editUser(updatedUser: User): boolean {
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        // Se a senha estiver vazia, mantenha a senha anterior
        if (!updatedUser.password) {
          updatedUser.password = this.users[index].password;
        }
        this.users[index] = { ...updatedUser };
        this.saveUsersToStorage();
    
        // Atualiza o usuário logado se for o mesmo
        if (this.currentUser?.id === updatedUser.id) {
          this.currentUser = { ...updatedUser };
          localStorage.setItem("loggedUser", JSON.stringify(this.currentUser));
        }
    
        return true;
      }
      return false;
    },
    

    // Desativa usuário (soft delete)
    deactivateUser(id: string): boolean {
      const user = this.users.find(u => u.id === id);
      if (user) {
        user.status = 'inactive';
        this.saveUsersToStorage();
        // Se desativou o usuário logado, desloga
        if (this.currentUser?.id === id) {
          this.logout();
        }
        return true;
      }
      return false; // usuário não encontrado
    },

    // Filtra usuários para listagem por nome e status
    filterUsers(
      name: string = '',
      status: 'active' | 'inactive' | 'all' = 'all'
    ): User[] {
      return this.users.filter(user => {
        const matchesName = user.name.toLowerCase().includes(name.toLowerCase());
        const matchesStatus = status === 'all' ? true : user.status === status;
        return matchesName && matchesStatus;
      });
    },

    // Faz login: retorna true se sucesso, false se falha
    login(document: string, password: string): boolean {
      const user = this.users.find(
        u => u.document === document && u.password === password
      );
      if (user && user.status === 'active') {
        this.currentUser = user;
        localStorage.setItem('loggedUser', JSON.stringify(user));
        return true;
      }
      return false;
    },

    // Logout, limpa currentUser e localStorage
    logout() {
      this.currentUser = null;
      localStorage.removeItem('loggedUser');
    },

    // Carrega usuário logado do localStorage ao iniciar
    loadLoggedUser() {
      const data = localStorage.getItem('loggedUser');
      if (data) {
        this.currentUser = JSON.parse(data);
      }
    },
  },
});
