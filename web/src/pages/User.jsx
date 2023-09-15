import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User } from "../components/User";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import { registerUser, deleteUser, getUsers, updateUser } from "../services/user-service";


export function Users() {
  const [users, setUsers] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    findUsers();
    // eslint-disable-next-line
  }, []);

  async function findUsers() {
    try {
      const result = await getUsers();
      setUsers(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function removeUser(id) {
    try {
      await deleteUser(id);
      await findUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async function addUser(data) {
    try {
      await registerUser(data);
      setIsCreated(false);
      await findUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async function editUser(data) {
    try {
      await updateUser({
        id: data.id,
        Nome: data.Nome,
        Email: data.Email,
        Data_Nascimento: data.Data_Nascimento,
        Celular: data.Celular,
        CPF: data.CPF,
        Endereço: data.Endereço,
        Senha: data.Senha

        // Adicione mais campos de edição conforme necessário
      });
      await findUsers();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container fluid>
      <Header title="Usuários" />
      <Row className="w-50 m-auto mb-5 mt-5">
        <Button onClick={() => setIsCreated(true)}>Adicionar Novo Usuário</Button>
      </Row>

      <Col className="w-50 m-auto">
        {users && users.length > 0
          ? users.map((user, index) => (
              <User
                key={index}
                user={user}
                removeUser={async () => await removeUser(user.id)}
                editUser={editUser}
              />
            ))
          : <p className="text-center">Não existe nenhum usuário cadastrado!</p>}
      </Col>

      {/* Formulário dentro do Modal para adicionar novo usuário */}
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Novo Usuário</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(addUser)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type='text'
              label='Nome do Usuário'
              placeholder='Insira o nome do usuário'
              required={true}
              name='Nome'
              error={errors.Nome}
              validations={register('Nome', {
                required: {
                  value: true,
                  message: 'Nome do Usuário é obrigatório.'
                }
              })}
            />
            
            <Input
              className="mb-3"
              type='email'
              label='Email'
              placeholder='Insira o email'
              required={true}
              name='Email'
              error={errors.Email}
              validations={register('Email', {
                required: {
                  value: true,
                  message: 'Email é obrigatório.'
                }
              })}
            />
            
            <Input
              className="mb-3"
              type='date'
              label='Data de Nascimento'
              required={true}
              name='Data_Nascimento'
              error={errors.Data_Nascimento}
              validations={register('Data_Nascimento', {
                required: {
                  value: true,
                  message: 'Data de Nascimento é obrigatória.'
                }
              })}
            />

            <Input
              className="mb-3"
              type='text'
              label='Celular'
              placeholder='Insira o celular'
              required={true}
              name='Celular'
              error={errors.Celular}
              validations={register('Celular', {
                required: {
                  value: true,
                  message: 'Celular é obrigatório.'
                }
              })}
            />
            
            <Input
              className="mb-3"
              type='text'
              label='CPF'
              placeholder='Insira o CPF'
              required={true}
              name='CPF'
              error={errors.CPF}
              validations={register('CPF', {
                required: {
                  value: true,
                  message: 'CPF é obrigatório.'
                }
              })}
            />
            
            <Input
              className="mb-3"
              type='text'
              label='Endereço'
              placeholder='Insira o endereço'
              required={true}
              name='Endereço'
              error={errors.Endereço}
              validations={register('Endereço', {
                required: {
                  value: true,
                  message: 'Endereço é obrigatório.'
                }
              })}
            />

        <Input
              className="mb-3"
              type='text'
              label='Senha'
              placeholder='Insira a senha'
              required={true}
              name='Senha'
              error={errors.Senha}
              validations={register('Senha', {
                required: {
                  value: true,
                  message: 'Senha é obrigatória.'
                }
              })}
            />




            {/* Adicione mais campos de edição conforme necessário */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit">Adicionar</Button>
            <Button variant="secondary" onClick={() => setIsCreated(false)}>Fechar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
