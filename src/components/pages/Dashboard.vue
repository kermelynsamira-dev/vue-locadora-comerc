<template>
  <div class="relative min-h-screen text-white overflow-hidden px-6 md:px-16 py-12 flex flex-col justify-center">
    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">

      <!-- Texto institucional -->
      <div class="max-w-xl space-y-6 text-left">
        <h1 class="text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
          Bem-vindo à CineComerc
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed">
          Gerencie sua locadora com eficiência: cadastre clientes, usuários, filmes e controle as locações de forma simples e moderna.
        </p>
        <button
          @click="goTo('/movies')"
          class="bg-[#E50914] px-8 py-1 rounded hover:bg-red-700 transition"
        >
          Filmes
        </button>
      </div>

      <!-- Cards com métricas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        <Card title="Usuários" :value="totalUsers" icon="user" color="red" />
        <Card title="Clientes" :value="totalClients" icon="users" color="red" />
        <Card title="Filmes" :value="totalMovies" icon="film" color="red" />
        <Card title="Locações Ativas" :value="activeRentals" icon="calendar" color="red" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/dashboard/DashboardCard.vue'
import { useUserStore } from '@/stores/user'
import { useClientStore } from '@/stores/client'
import { useMovieStore } from '@/stores/movie'
import { useRentalStore } from '@/stores/rental'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const clientStore = useClientStore()
const movieStore = useMovieStore()
const rentalStore = useRentalStore()
const router = useRouter()

// Computed-like: pega o tamanho das listas no store para exibir
const totalUsers = userStore.users.length
const totalClients = clientStore.clients.length
const totalMovies = movieStore.movies.length
const activeRentals = rentalStore.rentals.filter(r => r.status === 'alugado').length

// Função para navegar para outra rota
function goTo(path: string) {
  router.push(path)
}
</script>
