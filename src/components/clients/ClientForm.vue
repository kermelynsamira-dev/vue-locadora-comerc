<template>
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg overflow-auto max-h-[90vh]">
        <h2 class="text-xl font-semibold mb-4">
          {{ clientToEdit ? 'Editar Cliente' : 'Novo Cliente' }}
        </h2>
  
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Nome e Sobrenome -->
          <div class="flex gap-4">
            <input v-model="form.firstName" type="text" placeholder="Nome" required class="border p-2 rounded flex-1" />
            <input v-model="form.lastName" type="text" placeholder="Sobrenome" required class="border p-2 rounded flex-1" />
          </div>
  
          <!-- CPF -->
          <input v-model="form.cpf" type="text" placeholder="CPF" required class="border p-2 rounded w-full" maxlength="11" />
  
          <!-- Email -->
          <input v-model="form.email" type="email" placeholder="Email" required class="border p-2 rounded w-full" />
  
          <!-- Celular -->
          <input v-model="form.phone" type="tel" placeholder="Celular" required class="border p-2 rounded w-full" />
  
          <!-- Endereço -->
          <div>
            <label class="block mb-1 font-semibold">Endereço</label>
            <div class="flex gap-2 mb-2">
              <input
                v-model="form.address.cep"
                type="text"
                placeholder="CEP"
                required
                maxlength="8"
                @blur="fetchAddress"
                class="border p-2 rounded flex-1"
              />
            </div>
            <input
              v-model="form.address.street"
              type="text"
              placeholder="Rua"
              required
              :readonly="addressLocked"
              class="border p-2 rounded w-full mb-2"
            />
            <input
              v-model="form.address.neighborhood"
              type="text"
              placeholder="Bairro"
              required
              :readonly="addressLocked"
              class="border p-2 rounded w-full mb-2"
            />
            <div class="flex gap-2">
              <input
                v-model="form.address.city"
                type="text"
                placeholder="Cidade"
                required
                :readonly="addressLocked"
                class="border p-2 rounded flex-1"
              />
              <input
                v-model="form.address.uf"
                type="text"
                placeholder="UF"
                required
                maxlength="2"
                :readonly="addressLocked"
                class="border p-2 rounded w-20"
              />
            </div>
          </div>
  
          <!-- Botões -->
          <div class="flex justify-end gap-4 mt-4">
            <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded">Cancelar</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
          </div>
        </form>
  
        <!-- Feedback -->
        <div v-if="feedbackMessage" :class="feedbackClass" class="mt-4 p-2 rounded text-center">
          {{ feedbackMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { useClientStore } from '@/stores/client';
  import type { Client } from '@/stores/client';
  import { v4 as uuidv4 } from 'uuid';
  
  const props = defineProps<{
    clientToEdit: Client | null;
  }>();
  
  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'saved'): void;
  }>();
  
  const clientStore = useClientStore();
  
  const feedbackMessage = ref('');
  const feedbackClass = ref('');
  const addressLocked = ref(false);
  
  const form = reactive<Client>({
    id: '',
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      uf: '',
    },
    status: 'active',
  });
  
  function loadClient(client: Client | null) {
    if (client) {
      Object.assign(form, client);
      addressLocked.value = true;
    } else {
      Object.assign(form, {
        id: '',
        firstName: '',
        lastName: '',
        cpf: '',
        email: '',
        phone: '',
        address: {
          cep: '',
          street: '',
          neighborhood: '',
          city: '',
          uf: '',
        },
        status: 'active',
      });
      addressLocked.value = false;
    }
  }
  
  watch(
    () => props.clientToEdit,
    (newClient) => {
      loadClient(newClient);
    },
    { immediate: true }
  );
  
  async function fetchAddress() {
    if (!form.address.cep || form.address.cep.length !== 8) {
      feedbackMessage.value = 'CEP inválido ou incompleto.';
      feedbackClass.value = 'text-red-600';
      addressLocked.value = false;
      return;
    }
  
    try {
      const res = await fetch(`https://viacep.com.br/ws/${form.address.cep}/json/`);
      const data = await res.json();
  
      if (data.erro) {
        feedbackMessage.value = 'CEP não encontrado, preencha endereço manualmente.';
        feedbackClass.value = 'text-yellow-600';
        addressLocked.value = false;
      } else {
        form.address.street = data.logradouro;
        form.address.neighborhood = data.bairro;
        form.address.city = data.localidade;
        form.address.uf = data.uf;
        feedbackMessage.value = 'Endereço carregado com sucesso!';
        feedbackClass.value = 'text-green-600';
        addressLocked.value = true;
      }
    } catch {
      feedbackMessage.value = 'Erro ao buscar CEP, preencha endereço manualmente.';
      feedbackClass.value = 'text-red-600';
      addressLocked.value = false;
    }
  }
  
  function validateCPF(cpf: string) {
    // Validação simples de CPF (só tamanho)
    return cpf.length === 11;
  }
  
  function onSubmit() {
    if (!form.firstName || !form.lastName) {
      feedbackMessage.value = 'Nome e sobrenome são obrigatórios.';
      feedbackClass.value = 'text-red-600';
      return;
    }
    if (!validateCPF(form.cpf)) {
      feedbackMessage.value = 'CPF inválido.';
      feedbackClass.value = 'text-red-600';
      return;
    }
    if (!form.email.includes('@')) {
      feedbackMessage.value = 'Email inválido.';
      feedbackClass.value = 'text-red-600';
      return;
    }
    if (!form.phone) {
      feedbackMessage.value = 'Celular é obrigatório.';
      feedbackClass.value = 'text-red-600';
      return;
    }
    if (!form.address.cep || !form.address.street || !form.address.city) {
      feedbackMessage.value = 'Endereço incompleto.';
      feedbackClass.value = 'text-red-600';
      return;
    }
  
    if (form.id) {
      clientStore.updateClient({ ...form });
    } else {
      form.id = uuidv4();
      clientStore.addClient({ ...form });
    }
  
    feedbackMessage.value = 'Cliente salvo com sucesso!';
    feedbackClass.value = 'text-green-600';
  
    setTimeout(() => {
      feedbackMessage.value = '';
      emit('saved');
    }, 1500);
  }
  </script>
  