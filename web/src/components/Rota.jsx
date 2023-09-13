import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function Rota(props) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [isUpdated, setIsUpdated] = useState(false);
  const [rotaData, setRotaData] = useState({
    Nome_Rota: props.rota.Nome_Rota,
    Descricao_Rota: props.rota.Descricao_Rota,
  });

  const editRota = async (data) => {
    await props.editRota({ ...data, id: props.rota.id });
    setIsUpdated(false);
  };

  useEffect(() => {
    setRotaData({
      Nome_Rota: props.rota.Nome_Rota,
      Descricao_Rota: props.rota.Descricao_Rota,
    });
  }, [props.rota]);

  return (
    <>
      <Card className="mb-3 p-3 bg-light">
        <Card.Title><strong>Nome da Rota: </strong>{rotaData.Nome_Rota}</Card.Title>
        <Card.Text><strong>Descrição da Rota: </strong>{rotaData.Descricao_Rota}</Card.Text>
        <Row xs="auto" className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
          <Button variant="outline-danger" className="ms-3" onClick={props.removeRota}>Apagar</Button>
        </Row>
      </Card>
      <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
        <Modal.Header>
          <Modal.Title>Editar Rota</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(editRota)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type="text"
              defaultValue={rotaData.Nome_Rota}
              label="Nome da Rota"
              placeholder="Insira o nome da rota"
              required={true}
              name="Nome_Rota"
              error={errors.Nome_Rota}
              validations={register('Nome_Rota', {
                required: {
                  value: true,
                  message: 'Nome da Rota é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="text"
              defaultValue={rotaData.Descricao_Rota}
              label="Descrição da Rota"
              placeholder="Insira a descrição da rota"
              required={true}
              name="Descricao_Rota"
              error={errors.Descricao_Rota}
              validations={register('Descricao_Rota', {
                required: {
                  value: true,
                  message: 'Descrição da Rota é obrigatória.'
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