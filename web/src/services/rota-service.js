import { api } from "./api";

export async function getRotas() {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.get('/rota', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;

}




export async function deleteRota(id) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/rota/$ } catch (error) {
      throw error;
    }{id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
 
}

export async function updateRota(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.put(`/rotas/${data.id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    }, {
      Nome_Rota: data.Nome_Rota,
      Descricao_Rota: data.Descricao_Rota
      // Adicione mais campos de atualização conforme necessário
    });
    return result;
  
}

export async function createRota(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.post('/rota', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    }, {
      Nome_Rota: data.Nome_Rota,
      Descricao_Rota: data.Descricao_Rota
      // Adicione mais campos de criação conforme necessário
    });
    return result;
 
}
