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
        {/* Adicione mais informações da escola aqui */}
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

            {/* Adicione mais campos de edição conforme necessário */}
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