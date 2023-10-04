import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function EditRota(props) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [isUpdated, setIsUpdated] = useState(false);
  const [rotaData, setRotaData] = useState({
    Nome_Rota: props.rota.Nome_Rota,
    Descricao_Rota: props.rota.Descricao_Rota,
  });

 async function editRota (data) {
    await props.editRota({ ...data, id: props.rota.id });
    props.setIsUpdated(false);
  }


  return (
    <Modal show={props.isUpdated} onHide={() => props.setIsUpdated(false)}>

     
        <Modal.Header>
          <Modal.Title>
          Editar Rota: Nome - {props.rota.Nome_Rota},
                    Descrição - {props.rota.Descricao_Rota}

          </Modal.Title>
       
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
            <Button variant="primary" type="submit" onClick={editRota}>Editar</Button>
            <Button variant="secondary" onClick={() => props.setIsUpdated(false)}>Fechar</Button>

           
         
          </Modal.Footer>
        </Form>
      </Modal>

  );
}