//pagina de perfil

// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

export default function UserProfile({ userProfile, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSubmit = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Image src={userProfile.photoUrl} alt="User" roundedCircle />
        </Col>
        <Col xs={8}>
          {isEditing ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedProfile.Nome}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="Email"
                  name="Email"
                  value={editedProfile.Email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBirthdate">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  value={editedProfile.birthdate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formCpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={editedProfile.cpf}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={editedProfile.address}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit}>
                Salvar
              </Button>
            </Form>
          ) : (
            <div>
              <h2>{userProfile.name}</h2>
              <p>Email: {userProfile.email}</p>
              <p>Data de Nascimento: {userProfile.birthdate}</p>
              <p>Celular: {userProfile.phone}</p>
              <p>CPF: {userProfile.cpf}</p>
              <p>Endereço: {userProfile.address}</p>
              <Button onClick={() => setIsEditing(true)}>Editar</Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
