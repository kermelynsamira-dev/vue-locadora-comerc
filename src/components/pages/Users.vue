<template>
  <div class="min-h-screen bg-gray-900">
    <div class="p-6 max-w-5xl mx-auto text-white font-montserrat">
      <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-600 drop-shadow-lg">
        Gestão de Usuários
      </h1>
      <UserList />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserList from '@/components/users/UserList.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>