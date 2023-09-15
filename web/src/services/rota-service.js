import { api } from "./api";

export async function getRotas() {
  try {
    const result = await api.get('/rotas');
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteRota(id) {
  try {
    const result = await api.delete(`/rotas/${id}`);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateRota(data) {
  try {
    const result = await api.put(`/rotas/${data.id}`, {
      Nome_Rota: data.Nome_Rota,
      Descricao_Rota: data.Descricao_Rota
      // Adicione mais campos de atualização conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createRota(data) {
  try {
    const result = await api.post('/rotas', {
      Nome_Rota: data.Nome_Rota,
      Descricao_Rota: data.Descricao_Rota
      // Adicione mais campos de criação conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}
