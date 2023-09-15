import React, { useEffect, useState } from "react";
import { Container, Button, Col, Modal, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Escola } from "../components/Escola";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createEscola, deleteEscola, getEscolas, updateEscola } from "../services/escola.service";

export function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    findEscolas();
    // eslint-disable-next-line
  }, []);

  async function findEscolas() {
    try {
      const result = await getEscolas();
      setEscolas(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function removeEscola(id) {
    try {
      await deleteEscola(id);
      await findEscolas();
    } catch (error) {
      console.error(error);
    }
  }

  async function addEscola(data) {
    try {
      await createEscola(data);
      setIsCreated(false);
      await findEscolas();
    } catch (error) {
      console.error(error);
    }
  }

  async function editEscola(data) {
    try {
      await updateEscola({
        id: data.id,
        Nome: data.Nome,
        Endereço_Completo: data.Endereço_Completo,
        Contato_Escola: data.Contato_Escola
        // Adicione mais campos de edição conforme necessário
      });
      await findEscolas();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container fluid>
      <Header title="Escolas" />
      <Row className="w-50 m-auto mb-5 mt-5">
        <Col md='10'>
          <Button onClick={() => setIsCreated(true)}>Adicionar Nova Escola</Button>
        </Col>
        {/* Botão de sair aqui */}
      </Row>

      <Col className="w-50 m-auto">
        {escolas && escolas.length > 0
          ? escolas.map((escola, index) => (
              <Escola
                key={index}
                escola={escola}
                removeEscola={async () => await removeEscola(escola.id)}
                editEscola={editEscola}
              />
            ))
          : <p className="text-center">Não existe nenhuma escola cadastrada!</p>}
      </Col>

      {/* Formulário dentro do Modal para adicionar nova escola */}
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Nova Escola</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(addEscola)} validated={!!errors}>
          <Modal.Body>
            <Input
              className="mb-3"
              type='text'
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

            {/* Adicione mais campos de adição conforme necessário */}
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
