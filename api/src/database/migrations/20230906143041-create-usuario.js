'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Data_Nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Celular: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CPF: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Endereço: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     
    
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  },
};
