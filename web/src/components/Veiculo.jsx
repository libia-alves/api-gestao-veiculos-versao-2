import React, { useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export function Veiculo(props) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [isUpdated, setIsUpdated] = useState(false);
  const [veiculoData, setVeiculoData] = useState({
    Tipo_Veiculo: props.veiculo.Tipo_Veiculo,
    Numero_Placa: props.veiculo.Numero_Placa,
    Capacidade_Máxima_Passageiros: props.veiculo.Capacidade_Máxima_Passageiros,
    Contato_Motorista: props.veiculo.Contato_Motorista,
    id_Rotas: props.veiculo.id_Rotas,
    id_Horario: props.veiculo.id_Horario,
    id_Escolas: props.veiculo.id_Escolas,
  });

  const editVeiculo = async (data) => {
    await props.editVeiculo({ ...data, id: props.veiculo.id });
    setIsUpdated(false);
  };

  return (
    <>
      <Card className="mb-3 p-3 bg-light">
        <Card.Text><strong>Tipo de Veículo: </strong>{veiculoData.Tipo_Veiculo}</Card.Text>
        <Card.Text><strong>Número de Placa: </strong>{veiculoData.Numero_Placa}</Card.Text>
        <Card.Text><strong>Capacidade Máxima de Passageiros: </strong>{veiculoData.Capacidade_Máxima_Passageiros}</Card.Text>
        <Card.Text><strong>Contato do Motorista: </strong>{veiculoData.Contato_Motorista}</Card.Text>
        <Card.Text><strong>ID da Rota: </strong>{veiculoData.id_Rotas}</Card.Text>
        <Card.Text><strong>ID do Horário: </strong>{veiculoData.id_Horario}</Card.Text>
        <Card.Text><strong>ID da Escola: </strong>{veiculoData.id_Escolas}</Card.Text>
        <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
      </Card>
      <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
        <Modal.Header>
          <Modal.Title>Editar Veículo</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(editVeiculo)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type="text"
              defaultValue={veiculoData.Tipo_Veiculo}
              label="Tipo de Veículo"
              placeholder="Insira o tipo de veículo"
              required={true}
              name="Tipo_Veiculo"
              error={errors.Tipo_Veiculo}
              validations={register('Tipo_Veiculo', {
                required: {
                  value: true,
                  message: 'Tipo de Veículo é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="text"
              defaultValue={veiculoData.Numero_Placa}
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
              defaultValue={veiculoData.Capacidade_Máxima_Passageiros}
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
              defaultValue={veiculoData.Contato_Motorista}
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
              defaultValue={veiculoData.id_Rotas}
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
              defaultValue={veiculoData.id_Horario}
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
              defaultValue={veiculoData.id_Escolas}
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