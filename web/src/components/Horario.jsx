import React, { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { getHorarios, createHorario, updateHorario, deleteHorario } from "../services/horario-service";

export function Horario() {
  const [horarios, setHorarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null);

  const { handleSubmit, register, formState: { errors } } = useForm();

  const refreshHorarios = async () => {
    const response = await getHorarios();
    if (response.status === 200) {
      setHorarios(response.data);
    }
  };

  useEffect(() => {
    refreshHorarios();
  }, []);

  const handleCreateHorario = async (data) => {
    const response = await createHorario(data);
    if (response.status === 201) {
      refreshHorarios();
      setIsModalOpen(false);
    }
  };

  const handleEditHorario = async (data) => {
    if (!selectedHorario) return;

    const response = await updateHorario(selectedHorario.id, data);
    if (response.status === 200) {
      refreshHorarios();
      setIsModalOpen(false);
    }
  };

  const handleDeleteHorario = async () => {
    if (!selectedHorario) return;

    const response = await deleteHorario(selectedHorario.id);
    if (response.status === 200) {
      refreshHorarios();
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <h1>Horários</h1>
      <Button onClick={() => { setIsModalOpen(true); setSelectedHorario(null); }}>Adicionar Horário</Button>
      {horarios.map((horario) => (
        <Card key={horario.id} className="mb-3 p-3 bg-light">
          <Card.Text><strong>Horário de Partida: </strong>{horario.Horario_Partida}</Card.Text>
          <Card.Text><strong>Horário de Chegada: </strong>{horario.Horario_Chegada}</Card.Text>
          <Row xs="auto" className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => { setIsModalOpen(true); setSelectedHorario(horario); }}>Editar</Button>
            <Button variant="outline-danger" className="ms-3" onClick={() => handleDeleteHorario(horario)}>Apagar</Button>
          </Row>
        </Card>
      ))}
      <Modal show={isModalOpen} onHide={() => { setIsModalOpen(false); setSelectedHorario(null); }}>
        {/* Conteúdo do Modal */}
        <Form onSubmit={selectedHorario ? handleSubmit(handleEditHorario) : handleSubmit(handleCreateHorario)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type="text"
              defaultValue={selectedHorario ? selectedHorario.Horario_Partida : ""}
              label="Horário de Partida"
              placeholder="Insira o horário de partida"
              required={true}
              name="Horario_Partida"
              error={errors.Horario_Partida}
              validations={register('Horario_Partida', {
                required: {
                  value: true,
                  message: 'Horário de partida é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type="text"
              defaultValue={selectedHorario ? selectedHorario.Horario_Chegada : ""}
              label="Horário de Chegada"
              placeholder="Insira o horário de chegada"
              required={true}
              name="Horario_Chegada"
              error={errors.Horario_Chegada}
              validations={register('Horario_Chegada', {
                required: {
                  value: true,
                  message: 'Horário de chegada é obrigatório.'
                }
              })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">{selectedHorario ? "Editar" : "Criar"}</Button>
            <Button variant="secondary" onClick={() => { setIsModalOpen(false); setSelectedHorario(null); }}>Fechar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}