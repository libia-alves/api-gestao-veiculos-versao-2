import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function User(props) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [isUpdated, setIsUpdated] = useState(false);
  const [userData, setUserData] = useState({
    Nome: props.user.Nome,
    Email: props.user.Email,
    Data_Nascimento: props.user.Data_Nascimento,
    Celular: props.user.Celular,
    CPF: props.user.CPF,
    Endereço: props.user.Endereço,
  });

  const editUser = async (data) => {
    await props.editUser({ ...data, id: props.user.id });
    setIsUpdated(false);
  };

  return (
    <>
      <Card className="mb-3 p-3 bg-light">
        <Card.Title><strong>Nome: </strong>{userData.Nome}</Card.Title>
        <Card.Text><strong>Email: </strong>{userData.Email}</Card.Text>
        <Card.Text><strong>Data de Nascimento: </strong>{userData.Data_Nascimento}</Card.Text>
        <Card.Text><strong>Celular: </strong>{userData.Celular}</Card.Text>
        <Card.Text><strong>CPF: </strong>{userData.CPF}</Card.Text>
        <Card.Text><strong>Endereço: </strong>{userData.Endereço}</Card.Text>
        <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
      </Card>
      <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
        <Modal.Header>
          <Modal.Title>Editar Usuário</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(editUser)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type="text"
              defaultValue={userData.Nome}
              label="Nome do Usuário"
              placeholder="Insira o nome do usuário"
              required={true}
              name="Nome"
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
              type="email"
              defaultValue={userData.Email}
              label="Email"
              placeholder="Insira o email"
              required={true}
              name="Email"
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
              type="date"
              defaultValue={userData.Data_Nascimento}
              label="Data de Nascimento"
              required={true}
              name="Data_Nascimento"
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
              type="text"
              defaultValue={userData.Celular}
              label="Celular"
              placeholder="Insira o celular"
              required={true}
              name="Celular"
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
              type="text"
              defaultValue={userData.CPF}
              label="CPF"
              placeholder="Insira o CPF"
              required={true}
              name="CPF"
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
              type="text"
              defaultValue={userData.Endereço}
              label="Endereço"
              placeholder="Insira o endereço"
              required={true}
              name="Endereço"
              error={errors.Endereço}
              validations={register('Endereço', {
                required: {
                  value: true,
                  message: 'Endereço é obrigatório.'
                }
              })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">Editar</Button>
            <Button variant="secondary" onClick={() => setIsUpdated(false)}>Fechar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}