import { api } from "./api";

export async function getEscolas() {
 
    const acessToken = sessionStorage.getItem('token');
    const result = await api.get('/escola',{
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }

    }
    
    );
    return result;


}

export async function deleteEscola(id) {
    const acessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/escola/${id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }

    });
    return result;
  
}

export async function updateEscola(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.put(`/escola/${data.id}`, {
      Nome: data.Nome,
      Endereço_Completo: data.Endereço_Completo,
      Contato_Escola: data.Contato_Escola,
      Pontos_Embarque_Desembarque: data.Pontos_Embarque_Desembarque,
      Informações_Motoristas: data.Informações_Motoristas,
      id_Gestor: data.id_Gestor
      // Adicione mais campos de atualização conforme necessário
  }, {  headers: {
    'Authorization': `Bearer ${JSON.parse(acessToken)}`
  }


  });
    return result;
  
}

export async function createEscola(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.post('/escola',{
      Nome: data.Nome,
      Endereço_Completo: data.Endereço_Completo,
      Contato_Escola: data.Contato_Escola,
      Pontos_Embarque_Desembarque: data.Pontos_Embarque_Desembarque,
      Informações_Motoristas: data.Informações_Motoristas,
      id_Gestor: data.id_Gestor
      
    }, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
      
    });
    return result;
  
}
