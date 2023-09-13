// EscolaController.js

const { HttpHelper } = require('../utils/http-helper');
const { EscolaModel } = require('../models/escola-model'); // Certifique-se de importar o modelo correto

class EscolaController {
  async create(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const {
        Nome,
        Endereço_Completo,
        Contato_Escola,
        Pontos_Embarque_Desembarque,
        Informações_Motoristas,
        id_Gestor,
      } = request.body;

      if (!Nome) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário

      const escola = await EscolaModel.create({
        Nome,
        Endereço_Completo,
        Contato_Escola,
        Pontos_Embarque_Desembarque,
        Informações_Motoristas,
        id_Gestor,
      });

      return httpHelper.created(escola);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async getAll(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const escolas = await EscolaModel.findAll();
      return httpHelper.ok(escolas);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async update(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { id } = request.params;
      const {
        Nome,
        Endereço_Completo,
        Contato_Escola,
        Pontos_Embarque_Desembarque,
        Informações_Motoristas,
        id_Gestor,
      } = request.body;

      if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário

      const escolaExists = await EscolaModel.findByPk(id);
      if (!escolaExists) return httpHelper.notFound('Escola não encontrada!');

      await escolaExists.update({
        Nome,
        Endereço_Completo,
        Contato_Escola,
        Pontos_Embarque_Desembarque,
        Informações_Motoristas,
        id_Gestor,
      });

      return httpHelper.ok({
        message: 'Escola atualizada com sucesso!',
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

      const escolaExists = await EscolaModel.findByPk(id);
      if (!escolaExists) return httpHelper.notFound('Escola não encontrada!');

      await EscolaModel.destroy({ where: { id: id } });

      return httpHelper.ok({
        message: 'Escola excluída com sucesso!',
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { EscolaController };
