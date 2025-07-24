<template>
  <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
    <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg text-white overflow-auto max-h-[80vh] overflow-y: auto;">
      <h2 class="text-2xl font-extrabold mb-6 text-red-600">
        {{ clientToEdit ? 'Editar Cliente' : 'Novo Cliente' }}
      </h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Nome e Sobrenome -->
        <div class="flex gap-4">
          <input
            v-model="form.firstName"
            type="text"
            placeholder="Nome"
            required
            class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
          />
          <input
            v-model="form.lastName"
            type="text"
            placeholder="Sobrenome"
            required
            class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
          />
        </div>

        <!-- CPF -->
        <input
          v-model="form.cpf"
          type="text"
          placeholder="CPF"
          maxlength="11"
          required
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        />

        <!-- Email -->
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        />

        <!-- Celular -->
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Celular"
          required
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        />

        <!-- Endereço -->
        <div>
          <label class="block mb-1 font-semibold">Endereço</label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="form.address.cep"
              type="text"
              placeholder="CEP"
              maxlength="8"
              required
              @blur="fetchAddress"
              class="flex-1 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
            />
          </div>

          <input
            v-model="form.address.street"
            type="text"
            placeholder="Rua"
            :readonly="addressLocked"
            required
            class="w-full mb-2 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
          />
          <input
            v-model="form.address.neighborhood"
            type="text"
            placeholder="Bairro"
            :readonly="addressLocked"
            required
            class="w-full mb-2 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
          />

          <div class="flex gap-2">
            <input
              v-model="form.address.city"
              type="text"
              placeholder="Cidade"
              :readonly="addressLocked"
              required
              class="flex-1 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
            />
            <input
              v-model="form.address.uf"
              type="text"
              placeholder="UF"
              maxlength="2"
              :readonly="addressLocked"
              required
              class="w-20 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
            />
          </div>
        </div>

        <!-- Status -->
        <select
          v-model="form.status"
          class="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-red-500/40"
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>

        <!-- Botões -->
        <div class="flex justify-end gap-4 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-500 text-white rounded hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Salvar
          </button>
        </div>
      </form>

      <!-- Feedback -->
      <div
        v-if="feedbackMessage"
        :class="feedbackClass"
        class="mt-4 p-2 rounded text-center"
        role="alert"
      >
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

// Props recebidos para edição e estado de edição
const props = defineProps<{
  clientToEdit: Client | null;
  isEditing: boolean;
}>();

// Eventos emitidos para fechar modal e avisar que salvou
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const clientStore = useClientStore();

const feedbackMessage = ref('');
const feedbackClass = ref('');
const addressLocked = ref(false);

// Formulário reativo usando tipo Client
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

// Função para carregar dados no formulário para editar ou limpar para novo cliente
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

// Watch para atualizar formulário quando props.clientToEdit mudar
watch(
  () => props.clientToEdit,
  (newClient) => {
    loadClient(newClient);
  },
  { immediate: true }
);

// Busca o endereço via API do ViaCEP ao perder o foco do campo CEP
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
      form.address.street = data.logradouro || '';
      form.address.neighborhood = data.bairro || '';
      form.address.city = data.localidade || '';
      form.address.uf = data.uf || '';
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

// Validação simples do CPF (apenas tamanho)
function validateCPF(cpf: string): boolean {
  return cpf.length === 11;
}

// Função para salvar cliente - validações básicas
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

  // Fecha modal e limpa mensagem após 1.5s
  setTimeout(() => {
    feedbackMessage.value = '';
    emit('saved');
  }, 1500);
}
</script>
