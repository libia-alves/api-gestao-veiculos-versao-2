

import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EditRota } from "../components/Rota";
import { Header } from "../components/Header";
import { Input } from '../components/Input';
import { createRota, deleteRota, getRotas, updateRota } from "../services/rota-service";
import { ModalComponent } from "../components/Modal";


export function Rotas() {
  const [rotas, setRotas] = useState([]);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [rotaSelecionada, setRotaSelecionada] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);


  const [result, setResult] = useState(null);
  const [result1, setResult1] = useState(null);


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
    const answer = window.confirm(
      "Tem certeza que deseja excluir este horário?"
    );
    if (answer) {
      try {
        await deleteRota(id);
        alert("rota deletada com sucesso!");
        await findRotas();
      } catch (error) {
        setResult({
          title: 'Houve um erro na deletação!',
          message: error.response.data.error,
        });
      }
    }
  }


  //   async function removeHorario(id) {
  //     const answer = window.confirm(
  //         "Tem certeza que deseja excluir este horário?"
  //     );

  //     if (answer) {
  //         try {
  //             await deleteHorario(id);
  //             alert("Cadastro deletado com sucesso!");
  //             await findHorarios();
  //             debugger;
  //         } catch (error) {
  //             console.error(error);
  //         }
  //     }
  // }







  async function addRota(data) {
    try {
      await createRota(data);
      setIsCreated(false);

      alert("rota feita com sucesso!");
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
      alert("Cadastro editado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  async function filtrarRota(rotaString) {
    if (rotaString.length > 0) {
      const valorNumerico = parseInt(rotaString, 10); // Converter a entrada para um número inteiro

      const resultadosFiltrados = rotas.filter(objeto => {
        // Verifica se o campo Nome_Rota é igual ao valor numérico fornecido
        return objeto.Nome_Rota === valorNumerico;
      });

      setRotas(resultadosFiltrados);
    } else {
      findRotas();
    }
  }



  return (

    <Container fluid>
      <ModalComponent
        show={result}
        title={result?.title}
        message={result?.message}
        handleClose={() => setResult(null)}
      />
      <Header title="Rotas" />
      <Row className="w-50 m-auto mb-5 mt-5">

        <Col md={8}>
          <Form.Control
            type="number"
            onChange={(e) => { filtrarRota(e.target.value) }}
            placeholder="Filtrar por Nome_Rota (número)"
          />
        </Col>


        <Col md='4'>
          <Button onClick={() => setIsCreated(true)}>Adicionar Nova Rota</Button>
        </Col>
      </Row>

      <Col className="w-50 m-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome da rota</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rotas && rotas.length > 0 ?
              rotas.map((rota, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rota.Nome_Rota}</td>
                  <td>{rota.Descricao_Rota}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setRotaSelecionada(rota);
                        setIsUpdated(true);
                      }}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() =>
                        removeRota(rota.id)
                      }
                    >
                      Excluir
                    </Button>
                  </td>

                </tr>
              ))
              : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Não existe nenhum horário cadastrado!
                  </td>
                </tr>
              )}
          </tbody>
        </Table>
      </Col>




      {/* Formulário dentro do Modal para adicionar nova rota */}
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Nova Rota</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(addRota)} validated={!!errors}>
          <Modal.Body>

            <Form.Group controlId="Nome_Rota">
              <Form.Label>Nome da rota</Form.Label>
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
            </Form.Group>

            <Form.Group controlId="Descricao_Rota">
              <Form.Label>Descrição da Rota</Form.Label>
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
            </Form.Group>

            {/* Adicione mais campos de edição conforme necessário */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit">Adicionar</Button>
            <Button variant="secondary" onClick={() => setIsCreated(false)}>Fechar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <EditRota
        editRota={editRota}
        setIsUpdated={setIsUpdated}
        isUpdated={isUpdated}
        rota={rotaSelecionada}
      />


    </Container>
  );
}


