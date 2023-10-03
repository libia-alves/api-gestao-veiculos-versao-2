import React, { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "./Input";


export function Horario(props) {
  const { handleSubmit, register, formState: { errors } } = useForm(); // Corrigi "formsState" para "formState"
  const [isUpdated, setIsUpdated] = useState(false);

  async function editHorario (data) {
    await props.editHorario ({ ...data, id: props.horario.id });
    setIsUpdated (false);
  }

  /*
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);

  
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
    data.id = selectedHorario.id;
    const response = await updateHorario(data);
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
  */

  return (
    <>
      <h1>Horários</h1>
      <Card className="mb-3 p-3 bg-light">
      
        
          <Card.Text><strong>Horário de Partida: </strong>{props.horario.Horario_Partida}</Card.Text>
          <Card.Text><strong>Horário de Chegada: </strong>{props.horario.Horario_Chegada}</Card.Text>

          <Row xs="auto" className="d-flex justify-content-end">

            <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
            <Button variant="outline-danger" className="ms-3" onClick={props.removeHorario}>Apagar</Button> 
          </Row>
        </Card>
      
      <Modal show={isUpdated} onHide={() => { setIsUpdated(false) }}>
        <Modal.Header>
        <Modal.Title>Editar Horário: Partida - {props.horario.Horario_Partida}, Chegada - {props.horario.Horario_Chegada}</Modal.Title>

        </Modal.Header>
       

        <Form noValidate onSubmit={handleSubmit(editHorario)} validated={!!errors}>
          <Modal.Body>
          
          
          

            <Input
              className="mb-3"
              type='number'
              defaultValue={props.horario.Horario_Partida}
              label='Horario de partida'
              placeholder='Insira o horário de partida '
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
              defaultValue={props.horario.Horario_Chegada}
              label='Horario de chegada'
              placeholder='Insira o horário de chegada '
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

