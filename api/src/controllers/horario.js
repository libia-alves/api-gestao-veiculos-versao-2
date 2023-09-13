// HorarioController.js

const { HttpHelper } = require('../utils/http-helper');
const { HorarioModel } = require('../models/horario-model'); // Importe o modelo correto

class HorarioController {
  async create(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { Horario_Partida, Horario_Chegada } = request.body;

      if (!Horario_Partida || !Horario_Chegada) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário

      const horario = await HorarioModel.create({
        Horario_Partida,
        Horario_Chegada,
      });

      return httpHelper.created(horario);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async getAll(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const horarios = await HorarioModel.findAll();
      return httpHelper.ok(horarios);
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async update(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { id } = request.params;
      const { Horario_Partida, Horario_Chegada } = request.body;

      if (!id) return httpHelper.badRequest('Parâmetros inválidos!');

      // Validações adicionais, se necessário

      const horarioExists = await HorarioModel.findByPk(id);
      if (!horarioExists) return httpHelper.notFound('Horario não encontrado!');

      await horarioExists.update({
        Horario_Partida,
        Horario_Chegada,
      });

      return httpHelper.ok({
        message: 'Horario atualizado com sucesso!',
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

      const horarioExists = await HorarioModel.findByPk(id);
      if (!horarioExists) return httpHelper.notFound('Horario não encontrado!');

      await HorarioModel.destroy({ where: { id: id } });

      return httpHelper.ok({
        message: 'Horario excluído com sucesso!',
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { HorarioController };
