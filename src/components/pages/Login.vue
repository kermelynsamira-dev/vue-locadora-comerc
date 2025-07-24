<template>
  <!-- Tela inteira com imagem de fundo e overlay escuro -->
  <div
    class="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
  >
    <!-- Overlay preto translúcido -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- LOGO FIXO NO TOPO ESQUERDO -->
    <h1
      class="absolute top-6 left-6 text-3xl font-bold text-[#E50914] tracking-wide z-20"
    >
      CineComerc
    </h1>

    <!-- Conteúdo centralizado -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full px-4"
    >
      <!-- Caixa de login -->
      <div
        class="bg-black/80 p-8 rounded-lg w-full max-w-sm text-white shadow-lg"
      >
        <h2 class="text-2xl font-semibold mb-6">Entrar</h2>

        <!-- Formulário de login -->
        <form @submit.prevent="loginUser" class="flex flex-col space-y-4">
          <input
            v-model="document"
            type="text"
            placeholder="Email ou CPF"
            class="p-3 bg-neutral-800 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            class="p-3 bg-neutral-800 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          />
          <button
            type="submit"
            class="bg-[#E50914] hover:bg-red-700 transition-colors duration-200 text-white py-3 rounded font-semibold"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const document = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();

function loginUser() {
  const success = userStore.loginUser(document.value.trim(), password.value.trim());
  if (success) {
  router.push("/dashboard");
} else {
    alert("Documento ou senha inválidos!");
  }
}
</script>
