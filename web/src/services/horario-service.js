import { api } from "./api";

export async function getHorarios() {
  try {
    const result = await api.get('/horarios');
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteHorario(id) {
  try {
    const result = await api.delete(`/horarios/${id}`);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateHorario(data) {
  try {
    const result = await api.put(`/horarios/${data.id}`, {
      Horario_Partida: data.Horario_Partida,
      Horario_Chegada: data.Horario_Chegada
      // Adicione mais campos de atualização conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createHorario(data) {
  try {
    const result = await api.post('/horarios', {
      Horario_Partida: data.Horario_Partida,
      Horario_Chegada: data.Horario_Chegada
      // Adicione mais campos de criação conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}
