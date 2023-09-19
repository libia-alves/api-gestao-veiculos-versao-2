import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Horario } from "../components/Horario";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import { createHorario, deleteHorario, getHorarios, updateHorario } from "../services/horario-service";

export function Horarios() {
  const [horarios, setHorarios] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    findHorarios();
    // eslint-disable-next-line
  }, []);

  async function findHorarios() {
    try {
      const result = await getHorarios();
      setHorarios(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function removeHorario(id) {
    try {
      await deleteHorario(id);
      await findHorarios();
      debugger
    } catch (error) {
      console.error(error);
    }
  }

  async function addHorario(data) {
    try {

      await createHorario(data);
      setIsCreated(false);
      await findHorarios();
    } catch (error) {
      console.error(error);
    }
  }

  async function editHorario(data) {

    try {
      await updateHorario({
        id: data.id,
        Horario_Partida: data.Horario_Partida,
        Horario_Chegada: data.Horario_Chegada
        // Adicione mais campos de edição conforme necessário
      });
      await findHorarios();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container fluid>
      <Header title="Horários" />
      <Row className="w-50 m-auto mb-5 mt-5">
        <Button onClick={() => setIsCreated(true)}>Adicionar Novo Horário</Button>
      </Row>

      <Col className="w-50 m-auto">
        {horarios && horarios.length > 0
          ? horarios.map((horario, index) => (
              <Horario
                key={index}
                horario={horario}
                removeHorario={async () => await removeHorario(horario.id)}
                editHorario={editHorario}
              />
              
            ))
          : <p className="text-center">Não existe nenhum horário cadastrado!</p>}
      </Col>

      {/* Formulário dentro do Modal para adicionar novo horário */}
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Novo Horário</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(addHorario)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type='number'
              label='Horário de Partida'
              placeholder='Insira o horário de partida'
              required={true}
              name='Horario_Partida'
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
              type='number'
              label='Horário de Chegada'
              placeholder='Insira o horário de chegada'
              required={true}
              name='Horario_Chegada'
              error={errors.Horario_Chegada}
              validations={register('Horario_Chegada', {
                required: {
                  value: true,
                  message: 'Horário de chegada é obrigatório.'
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
