'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Horarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Horario_Partida: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Horario_Chegada: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Horarios');
  },
};
