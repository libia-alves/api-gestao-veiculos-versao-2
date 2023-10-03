import { api } from "./api";

export async function getUsers(id) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.get(`/user/${id}`, {
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
  const id = sessionStorage.getItem('id');
    const result = await api.put(`/user/${data.id}`,  {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço,
      Senha: data.Senha
      //Adicione mais campos de atualização conforme necessário
    } , {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
    });
    return result;
}

export async function createUser(data) {
  const acessToken = sessionStorage.getItem('token');
    const result = await api.post('/register', {
      Nome: data.Nome,
      Email: data.Email,
      Data_Nascimento: data.Data_Nascimento,
      Celular: data.Celular,
      CPF: data.CPF,
      Endereço: data.Endereço,
      Senha: data.Senha
      //Adicione mais campos de criação conforme necessário
    },  {
      headers: {
        'Authorization': `Bearer ${JSON.parse(acessToken)}`
      }
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
    sessionStorage.setItem('id', JSON.stringify(result.data.userId));
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
    sessionStorage.setItem('id', JSON.stringify(result.data.userId));
}





export async function getProfile() {
  const accessToken = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  debugger
  const result = await api.get(`/profile/${id}`, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(accessToken)}`
    }
  });
  return result;
}
export async function updateUserPerfil(data) {
  const accessToken = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id'); // Recupere o ID do usuário a partir da sessão

  const result = await api.put(`/user/${id}`, {
    Nome: data.Nome,
    Email: data.Email,
    Data_Nascimento: data.Data_Nascimento,
    Celular: data.Celular,
    CPF: data.CPF,
    Endereço: data.Endereço,
    Senha: data.Senha,
    // Adicione mais campos de atualização conforme necessário
  }, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(accessToken)}`
    }
  });

  return result;
}






// import React, { useState, useEffect } from 'react';
// import { Container, Button, Card, Form, Col, Row } from 'react-bootstrap';
// import { MDBIcon, MDBTypography, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';

// import { getProfile, updateProfile } from "../services/user-service";

// export function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     Nome: '',
//     Email: '',
//     Data_Nascimento: '',
//     Celular: '',
//     CPF: '',
//     Endereço: '',
//   });

//   const fetchUserProfile = async () => {
//     try {
//       const id = sessionStorage.getItem('id'); // Obtenha o ID do usuário de alguma forma (pode ser diferente dependendo da sua implementação).
//       const response = await getProfile(id);
//       setFormData(response.data);
//     } catch (error) {
//       console.error("Erro ao buscar perfil:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const onSave = async () => {
//     try {
//       const id = sessionStorage.getItem('id'); // Obtenha o ID do usuário de alguma forma.
//       await updateProfile({ ...formData, id });
//       toggleEditMode();
//     } catch (error) {
//       console.error("Erro ao salvar perfil:", error);
//     }
//   };

//   return (
//     <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
//       <Container className="py-5 h-100">
//         <Row className="justify-content-center align-items-center h-100">
//           <Col lg="6" className="mb-4 mb-lg-0">
//             <Card className="mb-3" style={{ borderRadius: '.5rem' }}>
//               <Row className="g-0">
//                 {/* Resto do seu código permanece o mesmo */}

//                 {/* Resto do seu código permanece o mesmo */}
//                 <Col md="8">
//                   <Card.Body className="p-4">
//                     <MDBTypography tag="h6">Informações</MDBTypography>
//                     <hr className="mt-0 mb-4" />
//                     <Form>
//                       <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm="4">Nome</Form.Label>
//                         <Col sm="8">
//                           {isEditing ? (
//                             <Form.Control
//                               type="text"
//                               name="Nome"
//                               value={formData.Nome}
//                               onChange={handleInputChange}
//                               className="input-edit-mode"
//                             />
//                           ) : (
//                             <Card.Text className="text-muted">{formData.Nome}</Card.Text>
//                           )}
//                         </Col>
//                       </Form.Group>

//                       <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm="4">Email</Form.Label>
//                         <Col sm="8">
//                           {isEditing ? (
//                             <Form.Control
//                               type="email"
//                               name="Email"
//                               value={formData.Email}
//                               onChange={handleInputChange}
//                               className="input-edit-mode"
//                             />
//                           ) : (
//                             <Card.Text className="text-muted">{formData.Email}</Card.Text>
//                           )}
//                         </Col>
//                       </Form.Group>

//                       {/* Outros campos de informação aqui */}

//                       <div className="d-flex justify-content-start">
//                         <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
//                         <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
//                         <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
//                       </div>
//                       {isEditing ? (
//                         <Button variant="primary" onClick={onSave}>Salvar</Button>
//                       ) : null}
//                     </Form>
//                   </Card.Body>
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }
