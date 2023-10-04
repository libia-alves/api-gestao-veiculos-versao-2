import React, { useEffect, useState } from "react";
import { Container, Button, Col, Modal, Form, Row, FormSelect, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Escola } from "../components/Escola";
import { Header } from "../components/Header";
import { Input } from '../components/Input';


import { createEscola, deleteEscola, getEscolas, updateEscola } from "../services/escola-service";
import { getUsers } from "../services/user-service";



export function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const id = sessionStorage.getItem('id');
  const [successMessage, setSuccessMessage] = useState("");  // Defini useState para erro e sucesso
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    findEscolas();
    findUsers();
    // eslint-disable-next-line
  }, []);

  async function findUsers() {
    try {
      const result = await getUsers(id);
      setUser(result.data);
      console.log(result.data)
    } catch (error) {
      console.error(error);

    }
  }


  async function findEscolas() {
    try {
      const result = await getEscolas();
      setEscolas(result.data);
      console.log(result.data)
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function filtrarEscola(escolaString) {
    if (escolaString.length > 0) {
      console.log(escolaString.length)
      const resultadosFiltrados = escolas.filter(objeto => objeto.Nome.includes(escolaString));
      setEscolas(resultadosFiltrados);
    } else {
      findEscolas();
    }
  }

  async function removeEscola(id) {
    const answer = window.confirm(
      "Tem certeza que deseja excluir este horário?"
    );
    if (answer) {
      try {
        await deleteEscola(id);
        alert("Escola deletada com sucesso!");
        await findEscolas();
        debugger;
      } catch (error) {
        console.error(error);
      }
    }
  }
  async function addEscola(data) {
    try {
      await createEscola(data);
      setIsCreated(false);
      alert("Cadastro feito com sucesso!");
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
        Contato_Escola: data.Contato_Escola,
        Pontos_Embarque_Desembarque: data.Pontos_Embarque_Desembarque,
        Informações_Motoristas: data.Informações_Motoristas,
        id_Gestor: data.id_Gestor
        // Adicione mais campos de edição conforme necessário
      });
      await findEscolas();
      alert("Cadastro editado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }





  return (




    <Container fluid>



      <Header title="Escolas" />



      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Row className="w-50 m-auto mb-5 mt-5">

        <Col md='8'>
          <Form.Control
            type="text"
            onChange={(e) => { filtrarEscola(e.target.value) }}></Form.Control>
        </Col>
        <Col md='4'>
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

            <Input
              className="mb-3"
              type='text'
              label='Pontos_Embarque_Desembarque'
              placeholder='Insira os pontos de embarque e desembarque'
              required={true}
              name='Pontos_Embarque_Desembarque'
              error={errors.Pontos_Embarque_Desembarque}
              validations={register('Pontos_Embarque_Desembarque', {
                required: {
                  value: true,
                  message: 'Pontos de Embarque e Desembarque é obrigatório.'
                }
              })}
            />
            <Input
              className="mb-3"
              type='text'
              label='Informações_Motoristas'
              placeholder='Insira as Informações_Motoristas'
              required={true}
              name='Informações_Motoristas'
              error={errors.Informações_Motoristas}
              validations={register('Informações_Motoristas', {
                required: {
                  value: true,
                  message: 'Informação para os motoristas é obrigatório.'
                }
              })}
            />



            <FormSelect
              aria-label="Selecione o gestor"
              className="mb-3"
              label='ID do gestor'
              required={true}
              name='id_Gestor'
              {...register('id_Gestor', {
                required: {
                  value: true,
                  message: 'ID da gestor é obrigatório.'
                }
              })}
            >
              <option value="">Selecione o gestor</option> {/* Adicione um valor vazio para a primeira opção */}
              {Array(user).map((id_Gestor) => (
                <option key={id_Gestor.id} value={id_Gestor.id}>
                  {id_Gestor.Nome}
                </option>
              ))}
            </FormSelect>



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