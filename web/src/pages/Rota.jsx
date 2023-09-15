import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Rota } from "../components/Rota";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import { createRota, deleteRota, getRotas, updateRota } from "../services/rota-service";

export function Rotas() {
  const [rotas, setRotas] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    findRotas();
    // eslint-disable-next-line
  }, []);

  async function findRotas() {
    try {
      const result = await getRotas();
      setRotas(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function removeRota(id) {
    try {
      await deleteRota(id);
      await findRotas();
    } catch (error) {
      console.error(error);
    }
  }

  async function addRota(data) {
    try {
      await createRota(data);
      setIsCreated(false);
      await findRotas();
    } catch (error) {
      console.error(error);
    }
  }

  async function editRota(data) {
    try {
      await updateRota({
        id: data.id,
        Nome_Rota: data.Nome_Rota,
        Descricao_Rota: data.Descricao_Rota
        // Adicione mais campos de edição conforme necessário
      });
      await findRotas();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container fluid>
      <Header title="Rotas" />
      <Row className="w-50 m-auto mb-5 mt-5">
        <Button onClick={() => setIsCreated(true)}>Adicionar Nova Rota</Button>
      </Row>

      <Col className="w-50 m-auto">
        {rotas && rotas.length > 0
          ? rotas.map((rota, index) => (
              <Rota
                key={index}
                rota={rota}
                removeRota={async () => await removeRota(rota.id)}
                editRota={editRota}
              />
            ))
          : <p className="text-center">Não existe nenhuma rota cadastrada!</p>}
      </Col>

      {/* Formulário dentro do Modal para adicionar nova rota */}
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Nova Rota</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(addRota)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type='text'
              label='Nome da Rota'
              placeholder='Insira o nome da rota'
              required={true}
              name='Nome_Rota'
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
              type='text'
              label='Descrição da Rota'
              placeholder='Insira a descrição da rota'
              required={true}
              name='Descricao_Rota'
              error={errors.Descricao_Rota}
              validations={register('Descricao_Rota', {
                required: {
                  value: true,
                  message: 'Descrição da Rota é obrigatória.'
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
