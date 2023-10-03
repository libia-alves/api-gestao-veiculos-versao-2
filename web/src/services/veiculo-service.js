import { api } from "./api";




export async function GraficogetVeiculos(filter = {}) {
  const accessToken = sessionStorage.getItem('token');
  const result = await api.get('/veiculo', {
    headers: {
      'Authorization': `Bearer ${JSON.parse(accessToken)}`
    },
    params: filter // Passa os filtros como parâmetros
  });
  return result;  
}

// Restante das funções permanece inalterado


export async function getVeiculos() {
 
  const acessToken = sessionStorage.getItem('token');
  const result = await api.get('/veiculo', {
    headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
    }
});
  return result;

}

export async function getTotalCount() {
  const acessToken = sessionStorage.getItem('token');
  const result = await api.get('/veiculos/count', {
    headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
});
  return result;

}

export async function updateVeiculo(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.put(`/veiculo/${data.id}`, {
      Numero_Placa: data.Numero_Placa,
      Capacidade_Máxima_Passageiross: data.Capacidade_Máxima_Passageiros,
      Contato_Motorista: data.Contato_Motorista,
      id_Rotas: data.id_Rotas,
      id_Horario: data.id_Horario,
      id_Escolas: data.id_Escolas
      // Adicione mais campos de atualização conforme necessário
  }, {  headers: {
    'Authorization': `Bearer ${JSON.parse(acessToken)}`
  }

  });
    return result;
  
}



export async function deleteVeiculo(id) {
  const acessToken = sessionStorage.getItem('token');
  const result = await api.delete(`/veiculo/${id}`, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(acessToken)}`
    }

  });
    return result;
}


export async function createVeiculo(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.post('/veiculo',{
      Numero_Placa: data.Numero_Placa,
      Tipo_Veiculo: data.Tipo_Veiculo,
      Capacidade_Máxima_Passageiros: data.Capacidade_Máxima_Passageiros,
      Contato_Motorista: data.Contato_Motorista,
      id_Rotas: data.id_Rotas,
      id_Horario: data.id_Horario,
      id_Escolas: data.id_Escolas
      
    }, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
      
    });
    return result;
  
}


