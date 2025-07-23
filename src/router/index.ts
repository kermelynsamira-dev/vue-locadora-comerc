import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/components/pages/Login.vue';
import Users from '@/components/pages/Users.vue';
import Clients from '@/components/pages/Clients.vue';
import Movies from '@/components/pages/Movies.vue';
import Rentals from '@/components/pages/Rentals.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/users', name: 'Users', component: Users },
  { path: '/clients', name: 'Clients', component: Clients },
  { path: '/movies', name: 'Movies', component: Movies },
  { path: '/rentals', name: 'Rentals', component: Rentals },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;