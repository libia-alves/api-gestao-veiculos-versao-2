import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function Escola(props) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [isUpdated, setIsUpdated] = useState(false);

  async function editEscola(data) {
    await props.editEscola({ ...data, id: props.escola.id });
    setIsUpdated(false);
  }

  return (
    <>
      <Card className="mb-3 p-3 bg-light">
        <Card.Title><strong>Nome: </strong>{props.escola.Nome}</Card.Title>
        <Card.Text><strong>Endereço: </strong>{props.escola.Endereço_Completo}</Card.Text>
        <Card.Text><strong>Contato: </strong>{props.escola.Contato_Escola}</Card.Text>
        <Card.Title><strong>Pontos_Embarque_Desembarque: </strong>{props.escola.Pontos_Embarque_Desembarque}</Card.Title>
        <Card.Text><strong>Informações_Motoristas: </strong>{props.escola.Informações_Motoristas}</Card.Text>
        <Card.Text><strong>id_Gestor: </strong>{props.escola.id_Gestor}</Card.Text>

        <Row xs="auto" className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
          <Button variant="outline-danger" className="ms-3" onClick={props.removeEscola}>Apagar</Button>
        </Row>
      </Card>

      <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
        <Modal.Header>
          <Modal.Title>Editar escola: {props.escola.Nome}</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(editEscola)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type='text'
              defaultValue={props.escola.Nome}
              label='Nome da escola'
              placeholder='Insira o nome da escola'
              required={true}
              name='Nome'
              error={errors.Nome}
              validations={register('Nome', {
                required: {
                  value: true,
                  message: 'Nome da escola é obrigatório.'
                }
              })}
            />
            
            <Input
              className="mb-3"
              type='text'
              defaultValue={props.escola.Endereço_Completo}
              label='Endereço completo'
              placeholder='Insira o endereço completo da escola'
              required={true}
              name='Endereço_Completo'
              error={errors.Endereço_Completo}
              validations={register('Endereço_Completo', {
                required: {
                  value: true,
                  message: 'Endereço completo é obrigatório.'
                }
              })}
            />

            <Input
              className="mb-3"
              type='text'
              defaultValue={props.escola.Contato_Escola}
              label='Contato da escola'
              placeholder='Insira o contato da escola'
              required={true}
              name='Contato_Escola'
              error={errors.Contato_Escola}
              validations={register('Contato_Escola', {
                required: {
                  value: true,
                  message: 'Contato da escola é obrigatório.'
                }
              })}
            />


            <Input
              className="mb-3"
              type='text'
              defaultValue={props.escola.Pontos_Embarque_Desembarque}
              label='Pontos de embarque e desembarque'
              placeholder='Insira as informações dos pontos de embarque e desembarque'
              required={true}
              name='Pontos_Embarque_Desembarque'
              error={errors.Pontos_Embarque_Desembarque}
              validations={register('Pontos_Embarque_Desembarque', {
                required: {
                  value: true,
                  message: 'Pontos de Embarque Desembarque são obrigatórios.'
                }
              })}
            />

            <Input
              className="mb-3"
              type='text'
              defaultValue={props.escola.Informações_Motoristas}
              label='Informações para os Motoristas'
              placeholder='Insira as informações para os motoristas que desejar'
              required={true}
              name='Informações_Motoristas'
              error={errors.Informações_Motoristas}
              validations={register('Informações_Motoristas', {
                required: {
                  value: true,
                  message: 'Informações para os Motoristas são obrigatórios.'
                }
              })}
            />
            <Input
              className="mb-3"
              type='text'
              defaultValue={props.escola.id_Gestor}
              label='id_Gestor'
              placeholder='Insira as informações de id_Gestor'
              required={true}
              name='id_Gestor'
              error={errors.id_Gestor}
              validations={register('id_Gestor', {
                required: {
                  value: true,
                  message: 'id_Gestor é obrigatório.'
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