<template>
  <div>
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