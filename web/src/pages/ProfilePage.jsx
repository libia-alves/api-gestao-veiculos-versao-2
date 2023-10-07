import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Form, Col, Row } from 'react-bootstrap';
import { MDBIcon, MDBTypography, MDBCardText } from 'mdb-react-ui-kit';
import CardImg from "../pages/perfil.png";

import { updateUserPerfil, getProfile } from "../services/user-service";

export function ProfilePage() {
  const CardImage = 'perfil.png';
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Nome: 'Nome do Usuário',
    Email: 'Email do Usuário',
    Data_Nascimento: 'Data de Nascimento',
    Celular: 'Celular',
    CPF: 'CPF',
    Endereço: 'Endereço',
  });

  useEffect(() => {
    findProfile();
    // eslint-disable-next-line
  }, []);

  async function findProfile() {
    try {
      const id = sessionStorage.getItem('id');
      const result = await getProfile(id);
      setUser(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onSave = async () => {
    try {
      const updatedUserData = { ...formData };

      // Se uma nova imagem de perfil foi selecionada, adicione-a ao objeto de dados atualizados
      if (file) {
        updatedUserData.avatar = file;
      }

      await updateUserPerfil(updatedUserData); // Envie os dados atualizados para o servidor
      toggleEditMode();
      // Atualize os dados do usuário após a atualização bem-sucedida
      findProfile();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



//   return (
//     <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
//       <Container className="py-6 vh-100 justify-content-center align-items-center">
//         <Row>
//           <Col lg="12" className="mb-5 mb-lg-0 mx-auto">
//             <Card className="mb-3" style={{ borderRadius: '.5rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '60px'}}>
//               {/* ... restante do código permanece igual */}
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }


  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <Container className="py-6 vh-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="13" className="mb-5 mb-lg-0">
          <Card className="mb-3" style={{ borderRadius: '.5rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '60px'}}>
              <Row className="g-0">
                <Col
                  md="4"
                  className="gradient-custom text-center text-white text-right"
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                  }}
                >
                  
                  <img src={CardImg} alt="" width={150} style={{ margin: '150px auto 0', display: 'block' }} />

                  <MDBTypography tag="h5">{user.Nome}</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  {isEditing ? null : (
                    <MDBIcon far icon="edit mb-5" onClick={toggleEditMode} />
                  )}
                </Col>
                <Col md="8">
                  <Card.Body className="p-4">
                    <MDBTypography tag="h6">Informações</MDBTypography>

                    {/* Nome */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Nome:
                      </Form.Label>
                      <Col sm="8">
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            name="Nome"
                            value={formData.Nome}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Card.Text className="text-muted">
                            {user.Nome}
                          </Card.Text>
                        )}
                      </Col>
                    </Form.Group>

                    {/* E-mail */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        E-mail:
                      </Form.Label>
                      <Col sm="8">
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            name="Email"
                            value={formData.Email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Card.Text className="text-muted">
                            {user.Email}
                          </Card.Text>
                        )}
                      </Col>
                    </Form.Group>

                    {/* Data de Nascimento */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Data de Nascimento:
                      </Form.Label>
                      <Col sm="8">
                        {isEditing ? (
                          <Form.Control
                            type="date"
                            name="Data_Nascimento"
                            value={formData.Data_Nascimento}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Card.Text className="text-muted">
                            {user.Data_Nascimento}
                          </Card.Text>
                        )}
                      </Col>
                    </Form.Group>

                    {/* Celular */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Celular:
                      </Form.Label>
                      <Col sm="8">
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            name="Celular"
                            value={formData.Celular}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Card.Text className="text-muted">
                            {user.Celular}
                          </Card.Text>
                        )}
                      </Col>
                    </Form.Group>

                    {/* CPF */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        CPF:
                      </Form.Label>
                      <Col sm="8">
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            name="CPF"
                            value={formData.CPF}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Card.Text className="text-muted">
                            {user.CPF}
                          </Card.Text>
                        )}
                      </Col>
                    </Form.Group>

                    {/* Endereço */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="4">
                        Endereço:
                      </Form.Label>
                      <Col sm="8">
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            name="Endereço"
                            value={formData.Endereço}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Card.Text className="text-muted">
                            {user.Endereço}
                          </Card.Text>
                        )}
                      </Col>
                    </Form.Group>

                    <hr className="mt-0 mb-4" />

                    {isEditing ? (
                      <Button variant="primary" onClick={onSave}>
                        Salvar
                      </Button>
                    ) : (
                      <Button
                        variant="outline-primary"
                        onClick={toggleEditMode}
                      >
                        Editar
                      </Button>
                    )}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
