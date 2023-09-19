import { api } from "./api";

export async function getHorarios() {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.get('/horario', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;

}



export async function deleteHorario(id) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/horario/${id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
 
}

export async function updateHorario(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.put(`/horario/${data.id}`, {
      Horario_Partida: data.Horario_Partida,
      Horario_Chegada: data.Horario_Chegada
      // Adicione mais campos de atualização conforme necessário
    }, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
 
}

export async function createHorario(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.post('/horario', {
      Horario_Partida: data.Horario_Partida,
      Horario_Chegada: data.Horario_Chegada
      // Adicione mais campos de criação conforme necessário
    }, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
 
}
