// VeiculoController.js

const { HttpHelper } = require('../utils/http-helper');
const { VeiculoModel } = require('../models/veiculo-model'); // Importe o modelo correto

class VeiculoController {
  async create(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const {
        Tipo_Veiculo,
        Numero_Placa,
        Capacidade_Máxima_Passageiros,
        Contato_Motorista,
        id_Rotas,
        id_Horario,
        id_Escolas,
      } = request.body;

      if (!Tipo_Veiculo || !Numero_Placa || !id_Rotas || !id_Horario || !id_Escolas) {
        return httpHelper.badRequest('Parâmetros inválidos!');
      }

      // Validações adicionais, se necessário

      const veiculo = await VeiculoModel.create({
        Tipo_Veiculo,
        Numero_Placa,
        Capacidade_Máxima_Passageiros,
        Contato_Motorista,
        id_Rotas,
        id_Horario,
        id_Escolas,
      });

      return httpHelper.created(veiculo);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async getAll(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const veiculos = await VeiculoModel.findAll();
      return httpHelper.ok(veiculos);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async update(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { id } = request.params;
      const {
        Tipo_Veiculo,
        Numero_Placa,
        Capacidade_Máxima_Passageiros,
        Contato_Motorista,
        id_Rotas,
        id_Horario,
        id_Escolas,
      } = request.body;

      if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário


      const veiculoExists = await VeiculoModel.findByPk(id);
      if (!veiculoExists) return httpHelper.notFound('Veículo não encontrado!');

      await veiculoExists.update({
        Tipo_Veiculo,
        Numero_Placa,
        Capacidade_Máxima_Passageiros,
        Contato_Motorista,
        id_Rotas,
        id_Horario,
        id_Escolas,
      });

      return httpHelper.ok({
        message: 'Veículo atualizado com sucesso!',
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async delete(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { id } = request.params;
      if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

      const veiculoExists = await VeiculoModel.findByPk(id);
      if (!veiculoExists) return httpHelper.notFound('Veículo não encontrado!');

      await VeiculoModel.destroy({ where: { id: id } });

      return httpHelper.ok({
        message: 'Veículo excluído com sucesso!',
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { VeiculoController };
