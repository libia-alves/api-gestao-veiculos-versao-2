import React, { useState } from "react";

export function VeiculoForm({ onSubmit, veiculoData }) {
  const [formData, setFormData] = useState(veiculoData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Tipo_Veiculo" className="form-label">
          Tipo de Veículo
        </label>
        <input
          type="text"
          className="form-control"
          id="Tipo_Veiculo"
          name="Tipo_Veiculo"
          value={formData.Tipo_Veiculo || ""}
          onChange={handleChange}
          required
        />
      </div>
      {/* Adicione outros campos aqui conforme necessário */}
      <button type="submit" className="btn btn-primary">
        Salvar
      </button>
    </form>
  );
}