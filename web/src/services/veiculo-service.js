import { api } from "./api";

export async function getVeiculos() {
    const acessToken = sessionStorage.getItem('token');
        const response = await api.get('/veiculo', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(acessToken)}`
              }
        });
        return response.data;
   
}


export async function getUsers() {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.get('/user', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
  
}


export async function getVeiculoById(id) {
    const acessToken = sessionStorage.getItem('token');
        const response = await api.get(`/veiculos/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(acessToken)}`
              }
        });
        return response.data;
    
}

export async function createVeiculo(veiculoData) {
    const acessToken = sessionStorage.getItem('token');
        const response = await api.post('/veiculos', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(acessToken)}`
              }
        }, veiculoData);
        return response.data;
   
}

export async function updateVeiculo(id, veiculoData) {
    const acessToken = sessionStorage.getItem('token');
        const response = await api.put(`/veiculo/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(acessToken)}`
              }
        }, veiculoData);
        return response.data;
    
}

export async function deleteVeiculo(id) {
    const acessToken = sessionStorage.getItem('token');
        await api.delete(`/veiculo/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(acessToken)}`
              }
        });
    
}