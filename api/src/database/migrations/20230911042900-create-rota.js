'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rotas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome_Rota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Descricao_Rota: {
        type: Sequelize.STRING,
        allowNull: false,
      },
   
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rotas');
  },
};
