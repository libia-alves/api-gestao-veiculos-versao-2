import { api } from "./api";

export async function getUsers() {
  try {
    const result = await api.get('/users');
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const result = await api.delete(`/users/${id}`);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data) {
  try {
    const result = await api.put(`/users/${data.id}`, {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço
      // Adicione mais campos de atualização conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createUser(data) {
  try {
    const result = await api.post('/register', {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço
      // Adicione mais campos de criação conforme necessário
    });
    return result;
  } catch (error) {
    throw error;
  }
}




export async function registerUser(data) {
    const result = await api.post('/register', {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.cpf,
      Endereco: data.Endereco,
      Senha: data.Senha
    });
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}
