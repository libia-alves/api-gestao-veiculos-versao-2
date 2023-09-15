import { api } from "./api";

export async function getEscolas() {
  try {
    const result = await api.get('/escolas');
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteEscola(id) {
  try {
    const result = await api.delete(`/escolas/${id}`);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateEscola(data) {
  try {
    const result = await api.put(`/escolas/${data.id}`, {
      Nome: data.Nome,
      Endereço_Completo: data.Endereço_Completo,
      Contato_Escola: data.Contato_Escola
      // Adicione mais campos de atualização conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createEscola(data) {
  try {
    const result = await api.post('/escolas', {
      Nome: data.Nome,
      Endereço_Completo: data.Endereço_Completo,
      Contato_Escola: data.Contato_Escola
      // Adicione mais campos de criação conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}
