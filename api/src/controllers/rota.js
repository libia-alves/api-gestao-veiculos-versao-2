// RotaController.js

const { HttpHelper } = require('../utils/http-helper');
const { RotaModel } = require('../models/rota-model'); // Importe o modelo correto

class RotaController {
  async create(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { Nome_Rota, Descricao_Rota } = request.body;

      if (!Nome_Rota || !Descricao_Rota) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário

      const rota = await RotaModel.create({
        Nome_Rota,
        Descricao_Rota
      });

      return httpHelper.created(rota);
    } catch (error) {
        console.log("ROtaController", error)
      return httpHelper.internalError(error);
    }
  }

  async getAll(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const rotas = await RotaModel.findAll();
      return httpHelper.ok(rotas);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async update(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { id } = request.params;
      const { Nome_Rota, Descricao_Rota } = request.body;

      if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário

      const rotaExists = await RotaModel.findByPk(id);
      if (!rotaExists) return httpHelper.notFound('Rota não encontrada!');

      await rotaExists.update({
        Nome_Rota,
        Descricao_Rota,
      });

      return httpHelper.ok({
        message: 'Rota atualizada com sucesso!',
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

      const rotaExists = await RotaModel.findByPk(id);
      if (!rotaExists) return httpHelper.notFound('Rota não encontrada!');

      await RotaModel.destroy({ where: { id: id } });

      return httpHelper.ok({
        message: 'Rota excluída com sucesso!',
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { RotaController };
