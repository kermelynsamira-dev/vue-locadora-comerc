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
    loadUsersFromStorage() {
      const data = localStorage.getItem('users');
      if (data) this.users = JSON.parse(data);
    },

    saveUsersToStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    registerUser(user: User) {
      this.users.push(user);
      this.saveUsersToStorage();
    },

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

    logout() {
      this.currentUser = null;
      localStorage.removeItem('loggedUser');
    },

    loadLoggedUser() {
      const data = localStorage.getItem('loggedUser');
      if (data) this.currentUser = JSON.parse(data);
    }
  }
});
