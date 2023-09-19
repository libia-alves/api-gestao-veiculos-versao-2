import { api } from "./api";

export async function getUsers() {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.get('/user', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
  
}



export async function deleteUser(id) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
  
}

export async function updateUser(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.put(`/user/${data.id}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    }, {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço,
      Senha: data.Senha
      // Adicione mais campos de atualização conforme necessário
    });
    return result;

}

export async function createUser(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.post('/register', {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    }, {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço,
      Senha: data.Senha
      // Adicione mais campos de criação conforme necessário
    });
    return result;
  
}




export async function registerUser(data) {
  
  console.log(data)
    const result = await api.post('/register', {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço,
      Senha: data.Senha
    });
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}
