import { api } from "./api";

export async function getRotas() {
  const acessToken = sessionStorage.getItem('token');
  return await api.get('/rota', {
    headers: {
      'Authorization': `Bearer ${JSON.parse(acessToken)}`
    }
  });
}

export async function deleteRota(id) {
  const acessToken = sessionStorage.getItem('token');
  return await api.delete(`/rota/${id}`, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(acessToken)}`
    }
  });
}

export async function updateRota(data) {
  const acessToken = sessionStorage.getItem('token');
  return await api.put(`/rota/${data.id}`, {
    Nome_Rota: data.Nome_Rota,
    Descricao_Rota: data.Descricao_Rota
    // Adicione mais campos de atualização conforme necessário
  }, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(acessToken)}`
    }
  });
}

export async function createRota(data) {
  const acessToken = sessionStorage.getItem('token');
  return await api.post('/rota', {
    Nome_Rota: data.Nome_Rota,
    Descricao_Rota: data.Descricao_Rota
    // Adicione mais campos de criação conforme necessário
  }, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(acessToken)}`
    }
  });
}
