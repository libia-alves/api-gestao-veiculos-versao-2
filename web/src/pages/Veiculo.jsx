import React, { useEffect, useState } from "react";
import { Button, Container, Col, Modal, Form, Row, FormSelect } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Veiculo } from "../components/Veiculo"; // Certifique-se de que o nome do componente esteja correto
import { Header } from "../components/Header";
import { Input } from '../components/Input';


import { createVeiculo, deleteVeiculo, getVeiculos, updateVeiculo } from "../services/veiculo-service";
import { getEscolas } from "../services/escola-service";

import { getRotas } from "../services/rota-service";
import { getHorarios } from "../services/horario-service";


export function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // State para modal de confirmação
  const [deleteVeiculoId, setDeleteVeiculoId] = useState(null); // Armazenar o ID do veículo a ser excluído






  // Supondo que você tenha uma função que busca a lista de escolas
  // e que essa função retorne um array de objetos com os campos Nome e id.
  const [escolas, setEscolas] = useState([]);
  const [horario, setHorario] = useState([]);
  const [rota, setRota] = useState([]);





  useEffect(() => {
    findVeiculos();
    findEscolas();
    findHorario();
    findRota();
    // eslint-disable-next-line
  }, []);

  async function findVeiculos() {
    try {
      const result = await getVeiculos();
      setVeiculos(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function findEscolas() {
    try {
      const result = await getEscolas();
      setEscolas(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function findRota() {
    try {
      const result = await getRotas();
      setRota(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }

  async function findHorario() {
    try {
      const result = await getHorarios();
      setHorario(result.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  }




  async function removeVeiculo(data) {
    setDeleteVeiculoId(data.id); // Armazenar o ID do veículo a ser excluído
    setConfirmDeleteModal(true); // Mostrar o modal de confirmação
  }

  async function confirmDelete() {
    if (deleteVeiculoId !== null) {
      try {
        await deleteVeiculo(deleteVeiculoId);
        setConfirmDeleteModal(false); // Fechar o modal de confirmação
        setDeleteVeiculoId(null); // Limpar o ID do veículo excluído
        alert("Cadastro deletado com sucesso!");
        await findVeiculos();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function addVeiculo(data) {
    try {
      console.log(data)
      await createVeiculo(data);
      setIsCreated(false);
      alert("Cadastro feito com sucesso!");
      await findVeiculos();
    } catch (error) {
      console.error(error);
    }
  }

  async function editVeiculo(data) {
    try {
      const response = await updateVeiculo({
        id: data.id,
        Tipo_Veiculo: data.Tipo_Veiculo,
        Numero_Placa: data.Numero_Placa,
        Capacidade_Máxima_Passageiros: data.Capacidade_Máxima_Passageiros,
        Contato_Motorista: data.Contato_Motorista,
        id_Rotas: data.id_Rotas,
        id_Horario: data.id_Horario,
        id_Escolas: data.id_Escolas,
        // Adicione mais campos de edição conforme necessário
      });

      if (response.status === 200) {
        // Update the state to trigger a re-render
        await findVeiculos();
        alert("Cadastro editado com sucesso!");
      } else {
        console.error("Failed to update vehicle.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function filtrarVeiculo(veiculoString) {
    if (veiculoString.length > 0) {
      console.log(veiculoString.length)
      const resultadosFiltrados = veiculos.filter(objeto => objeto.Tipo_Veiculo.includes(veiculoString));
      setVeiculos(resultadosFiltrados);
    } else {
      findVeiculos();
    }
  }



  return (


    <Container fluid>






      <Header title="Veículos" />
      <Row className="w-50 m-auto mb-5 mt-5">


       

          <Row>

           
              <Col>
                <Form.Control
                  type="text"
                  onChange={(e) => { filtrarVeiculo(e.target.value) }}
                  placeholder="Filtrar veiculo pelo tipo"
                />
              </Col>


              <Col>
                <Button onClick={() => setIsCreated(true)}>Adicionar Novo Veículo</Button>
              </Col>

           
          </Row>
       





        {/* Botão de sair aqui */}
      </Row>

      <Col className="w-50 m-auto">
      {veiculos && veiculos.length > 0 ? 
          veiculos.map((veiculo, index) => (
            <Veiculo
              key={index}
              veiculo={veiculo}
              removeVeiculo={removeVeiculo}
              editVeiculo={editVeiculo}
          />
        ))
        : <p className="text-center">Não existe nenhuma veiculo cadastrado!</p>}
    </Col>





      {/* Formulário dentro do Modal para adicionar novo veículo */}
      <Modal show={isCreated} onHide={() => setIsCreated(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Novo Veículo</Modal.Title>
        </Modal.Header>

        <Form noValidate onSubmit={handleSubmit(addVeiculo)} validated={!!errors}>
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




            {/*
            <Input
              className="mb-3"
              type='text'
              label='Tipo de Veículo'
              placeholder='Insira o tipo de veículo'
              required={true}
              name='Tipo_Veiculo'
              error={errors.Tipo_Veiculo}
              validations={register('Tipo_Veiculo', {
                required: {
                  value: true,
                  message: 'Tipo de Veículo é obrigatório.'
                }
              })}
            />*/}

            <Input
              className="mb-3"
              type='text'
              label='Número de Placa'
              placeholder='Insira o número de placa'
              required={true}
              name='Numero_Placa'
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
              type='number'
              label='Capacidade Máxima de Passageiros'
              required={true}
              name='Capacidade_Máxima_Passageiros'
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
              type='text'
              label='Contato do Motorista'
              placeholder='Insira o contato do motorista'
              required={true}
              name='Contato_Motorista'
              error={errors.Contato_Motorista}
              validations={register('Contato_Motorista', {
                required: {
                  value: true,
                  message: 'Contato do Motorista é obrigatório.'
                }
              })}
            />



            <FormSelect
              aria-label="Escolha uma Rota"
              className="mb-3"
              label='ID da Rota'
              required={true}
              name='id_Rotas'
              {...register('id_Rotas', {
                required: {
                  value: true,
                  message: 'ID da rota é obrigatório.'
                }
              })}
            >
              <option value="">Selecione uma Rota</option> {/* Adicione um valor vazio para a primeira opção */}
              {rota.map((rota) => (
                <option key={rota.id} value={rota.id}>
                  {rota.Nome_Rota}
                </option>
              ))}
            </FormSelect>





            <FormSelect
              aria-label="Escolha um Horário"
              className="mb-3"
              label='ID do Horario'
              required={true}
              name='id_Horario'
              {...register('id_Horario', {
                required: {
                  value: true,
                  message: 'ID do horário é obrigatório.'
                }
              })}
            >
              <option value="">Selecione uma horário</option> {/* Adicione um valor vazio para a primeira opção */}
              {horario.map((horario) => (
                <option key={horario.id} value={horario.id}>
                  {horario.Horario_Partida}
                </option>
              ))}
            </FormSelect>




            <FormSelect
              aria-label="Escolha uma escola"
              className="mb-3"
              label='ID da Escola'
              required={true}
              name='id_Escolas'
              {...register('id_Escolas', {
                required: {
                  value: true,
                  message: 'ID da Escola é obrigatório.'
                }
              })}
            >
              <option value="">Selecione uma escola</option> {/* Adicione um valor vazio para a primeira opção */}
              {escolas.map((escola) => (
                <option key={escola.id} value={escola.id}>
                  {escola.Nome}
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

 {/* Modal de confirmação de exclusão */}
 <Modal show={confirmDeleteModal} onHide={() => setConfirmDeleteModal(false)}>
        <Modal.Header>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir este veículo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>Confirmar Exclusão</Button>
          <Button variant="secondary" onClick={() => setConfirmDeleteModal(false)}>Cancelar</Button>
        </Modal.Footer>
      </Modal>





    </Container>
  );
}