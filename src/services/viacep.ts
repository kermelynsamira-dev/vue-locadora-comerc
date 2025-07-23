export interface Address {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
  }
  
  export async function fetchAddressByCep(cep: string): Promise<Address | null> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json`);
      const data: Address = await response.json();
  
      if (data.erro) return null;
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      return null;
    }
  }
  