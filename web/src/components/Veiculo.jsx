import React, { useState } from "react";
import { Button, Card, Modal, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { deleteVeiculo } from "../services/veiculo-service";



export function Veiculo(props) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [isUpdated, setIsUpdated] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");  // Defini useState para erro e sucesso
  const [errorMessage, setErrorMessage] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [isCreated, setIsCreated] = useState(false);


  async function editVeiculo (data) {
    await props.editVeiculo ({ ...data, id: props.veiculo.id });
    setIsUpdated(false);
  }

  async function removeVeiculo(data) {
    try {
      await props.removeVeiculo ({ ...data, id: props.veiculo.id });

    } catch (error) {
      console.error(error);}}


 
  return (

    <>
      <Card className="mb-5 p-5 bg-light">
        <Card.Text><strong>Tipo de Veículo: </strong>{props.veiculo.Tipo_Veiculo}</Card.Text>
        <Card.Text><strong>Número de Placa: </strong>{props.veiculo.Numero_Placa}</Card.Text>
        <Card.Text><strong>Capacidade Máxima de Passageiros: </strong>{props.veiculo.Capacidade_Máxima_Passageiros}</Card.Text>
        <Card.Text><strong>Contato do Motorista: </strong>{props.veiculo.Contato_Motorista}</Card.Text>
        <Card.Text><strong>  Rota: </strong>{props.veiculo.id_Rotas}</Card.Text>
        <Card.Text><strong>  Horário: </strong>{props.veiculo.id_Horario}</Card.Text>
        <Card.Text><strong>  Escola: </strong>{props.veiculo.id_Escolas}</Card.Text>
        <Row xs= "auto" className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>

        <Button variant="outline-danger" className="ms-3" onClick={removeVeiculo}>Apagar</Button>

        </Row>
      
      </Card>
      <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
        <Modal.Header>
          <Modal.Title>Editar Veículo</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(editVeiculo)} validated={!!errors}>
          <Modal.Body>
          <Form.Select
              aria-label="Tipo de Veículo"
              className={`mb-3 ${errors.Tipo_Veiculo ? 'is-invalid' : ''}`}
              label='Tipo de veículo'
              required={true}
              {...register('Tipo_Veiculo', {
                required: 'Tipo de Veículo é obrigatório.'
              })}
            >
              <option value="">Selecione o tipo de veículo</option>
              <option value="OFFROAD">OFFROAD</option>
              <option value="convencional">Convencional</option>
            </Form.Select>

            <Input
              className="mb-3"
              type="text"
              defaultValue={props.veiculo.Numero_Placa}
              label="Número de Placa"
              placeholder="Insira o número de placa"
              required={true}
              name="Numero_Placa"
              error={errors.Numero_Placa}
              validations={register('Numero_Placa', {
                required: {
                  value: true,
                  message: 'Número de Placa é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="number"
              defaultValue={props.veiculo.Capacidade_Máxima_Passageiros}
              label="Capacidade Máxima de Passageiros"
              required={true}
              name="Capacidade_Máxima_Passageiros"
              error={errors.Capacidade_Máxima_Passageiros}
              validations={register('Capacidade_Máxima_Passageiros', {
                required: {
                  value: true,
                  message: 'Capacidade Máxima de Passageiros é obrigatória.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="text"
              defaultValue={props.veiculo.Contato_Motorista}
              label="Contato do Motorista"
              placeholder="Insira o contato do motorista"
              required={true}
              name="Contato_Motorista"
              error={errors.Contato_Motorista}
              validations={register('Contato_Motorista', {
                required: {
                  value: true,
                  message: 'Contato do Motorista é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="number"
              defaultValue={props.veiculo.id_Rotas}
              label="ID da Rota"
              required={true}
              name="id_Rotas"
              error={errors.id_Rotas}
              validations={register('id_Rotas', {
                required: {
                  value: true,
                  message: 'ID da Rota é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="number"
              defaultValue={props.veiculo.id_Horario}
              label="ID do Horário"
              required={true}
              name="id_Horario"
              error={errors.id_Horario}
              validations={register('id_Horario', {
                required: {
                  value: true,
                  message: 'ID do Horário é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="number"
              defaultValue={props.veiculo.id_Escolas}
              label="ID da Escola"
              required={true}
              name="id_Escolas"
              error={errors.id_Escolas}
              validations={register('id_Escolas', {
                required: {
                  value: true,
                  message: 'ID da Escola é obrigatório.'
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