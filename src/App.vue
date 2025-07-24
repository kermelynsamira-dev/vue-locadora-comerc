<template>
  <div class="relative w-screen h-screen bg-cover bg-center bg-no-repeat" style="background-image: url('https://images.unsplash.com/photo-1721733258290-cac1a9204564?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
    <NavBar v-if="isLoggedIn" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";
import NavBar from "@/components/layouts/NavBar.vue";

const userStore = useUserStore();

const isLoggedIn = computed(() => !!userStore.currentUser);

onMounted(() => {
  userStore.loadUsersFromStorage();

  if (!userStore.users.some(u => u.document === 'admin')) {
    userStore.registerUser({
      id: "1",
      name: "Admin",
      document: "admin",
      password: "123",
      status: "active",
    });
  }

  userStore.loadLoggedUser();
});
</script>

<style></style>