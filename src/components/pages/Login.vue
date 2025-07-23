<template>
  <!-- Tela inteira com imagem de fundo e overlay escuro -->
  <div
    class="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
    style="
      background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/a927b1ee-784d-494a-aa80-cf7a062d2523/web/BR-pt-20250714-TRIFECTA-perspective_d87ab9a5-4b7b-44d6-8466-5c5dab8e8212_large.jpg');
    "
  >
    <!-- Overlay preto translúcido -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- LOGO FIXO NO TOPO ESQUERDO -->
    <h1
      class="absolute top-6 left-6 text-5xl font-bold text-[#E50914] tracking-wide z-20"
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

        <!-- Opções extras -->
        <div
          class="flex justify-between items-center text-sm text-gray-400 mt-4"
        >
          <label class="flex items-center gap-2">
            <input type="checkbox" class="accent-[#E50914]" />
            <span>Lembre-se de mim</span>
          </label>
          <a href="#" class="hover:underline">Precisa de ajuda?</a>
        </div>

        <!-- Cadastro novo -->
        <div class="text-sm text-gray-400 mt-6">
          Novo por aqui?
          <a href="#" class="text-white hover:underline">Cadastre-se agora</a>.
        </div>

        <!-- Proteção -->
        <p class="text-xs text-gray-500 mt-2">
          Esta página é protegida por reCAPTCHA para garantir que você não é um
          robô.
        </p>
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
  const success = userStore.login(document.value, password.value);
  if (success) {
    router.push("/users"); // redireciona para página de usuários
  } else {
    alert("Documento ou senha inválidos!");
  }
}
</script>
