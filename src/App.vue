<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

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

<style scoped></style>
