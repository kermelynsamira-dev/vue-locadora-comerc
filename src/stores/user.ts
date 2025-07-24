import { defineStore } from 'pinia';

export interface User {
  id: string;
  name: string;
  document: string;
  password?: string;
  status: 'active' | 'inactive';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
  }),

  getters: {
    // Indica se o usuário está logado
    isLoggedIn: (state) => !!state.currentUser,
  },

  actions: {
    // Carrega os usuários do localStorage
    loadUsersFromStorage() {
      const data = localStorage.getItem('users');
      if (data) {
        this.users = JSON.parse(data);
      }
    },

    // Salva os usuários no localStorage
    saveUsersToStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    // Registra novo usuário (retorna false se já existir documento)
    registerUser(user: User): boolean {
      const exists = this.users.some(u => u.document === user.document);
      if (exists) {
        return false;
      }
      this.users.push(user);
      this.saveUsersToStorage();
      return true;
    },

    // Edita usuário
    editUser(updatedUser: User): boolean {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        if (!updatedUser.password) {
          updatedUser.password = this.users[index].password;
        }
        this.users[index] = { ...updatedUser };
        this.saveUsersToStorage();

        if (this.currentUser?.id === updatedUser.id) {
          this.currentUser = { ...updatedUser };
          localStorage.setItem('loggedUser', JSON.stringify(this.currentUser));
        }

        return true;
      }
      return false;
    },

    // Soft delete (desativar usuário)
    deactivateUser(id: string): boolean {
      const user = this.users.find(u => u.id === id);
      if (user) {
        user.status = 'inactive';
        this.saveUsersToStorage();
        if (this.currentUser?.id === id) {
          this.logout();
        }
        return true;
      }
      return false;
    },

    // Filtro de listagem
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

    // Login
    loginUser(document: string, password: string): boolean {
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

    // Logout
    logout() {
      this.currentUser = null;
      localStorage.removeItem('loggedUser');
    },

    // Carrega usuário logado
    loadLoggedUser() {
      const data = localStorage.getItem('loggedUser');
      if (data) {
        this.currentUser = JSON.parse(data);
      }
    },
  },
});
