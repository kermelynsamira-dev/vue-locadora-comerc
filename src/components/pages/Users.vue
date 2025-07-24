<template>
  <div class="min-h-screen flex items-center justify-center text-white font-montserrat px-4">
    <div class="w-full max-w-5xl bg-black/70 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-red-700">
      <h1 class="text-4xl font-extrabold mb-6 tracking-wide text-red-500 text-center">
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
