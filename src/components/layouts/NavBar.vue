<template>
  <nav class="w-full px-6 py-4 flex justify-between items-center bg-transparent fixed top-0 left-0 z-20 text-white">
    <!-- Logo à esquerda -->
    <div class="text-lg font-bold cursor-pointer text-[#E50914]" @click="goToDashboard">
      CineComerc
    </div>

    <!-- Itens de menu + botão sair à direita -->
    <div class="flex items-center gap-6">
      <ul class="flex gap-6">
        <li><button @click="goTo('/users')" class="hover:underline">Usuários</button></li>
        <li><button @click="goTo('/clients')" class="hover:underline">Clientes</button></li>
        <li><button @click="goTo('/movies')" class="hover:underline">Filmes</button></li>
        <li><button @click="goTo('/rentals')" class="hover:underline">Locações</button></li>
      </ul>
      <button @click="logout" class="bg-[#E50914] px-3 py-1 rounded hover:bg-red-700">
        Sair
      </button>
    </div>
  </nav>
</template>

  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user'; // assumindo que o store do usuário se chama assim
  
  const router = useRouter();
  const userStore = useUserStore();
  
  function goTo(path: string) {
    router.push(path);
  }
  
  function goToDashboard() {
    router.push('/dashboard');
  }
  
  function logout() {
    userStore.logout(); // seu método para limpar sessão, token, localStorage etc
    router.push('/login');
  }
  </script>

  <style scoped>
</style>