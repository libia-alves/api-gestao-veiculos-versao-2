import React, { useEffect, useState } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";

import { getVeiculos, deleteVeiculo, createVeiculo, updateVeiculo } from "../services/veiculo-service";
import { VeiculoForm } from "../components/VeiculoForm"; // Importe o componente de formulário

export function Veiculos (){
  const [veiculos, setVeiculos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editVeiculo, setEditVeiculo] = useState(null);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await getVeiculos();
      setVeiculos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVeiculo(id);
      fetchVeiculos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createVeiculo(formData);
      fetchVeiculos();
      setShowForm(false); // Feche o formulário após a criação
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (veiculo) => {
    setEditVeiculo(veiculo);
    setShowForm(true); // Abra o formulário de edição com os dados do veículo
  };

  const handleUpdate = async (formData) => {
    if (!editVeiculo) return;

    try {
      await updateVeiculo(editVeiculo.id, formData);
      fetchVeiculos();
      setShowForm(false); // Feche o formulário após a edição
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Veículos</h2>
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Criar Veículo
      </Button>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header>
          <Modal.Title>
            {editVeiculo ? "Editar Veículo" : "Criar Veículo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VeiculoForm
            onSubmit={editVeiculo ? handleUpdate : handleCreate}
            veiculoData={editVeiculo || {}}
          />
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Veículo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>{veiculo.id}</td>
              <td>{veiculo.Tipo_Veiculo}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(veiculo)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(veiculo.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
