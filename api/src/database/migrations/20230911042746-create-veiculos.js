'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Veiculos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Tipo_Veiculo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Numero_Placa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Capacidade_Máxima_Passageiros: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Contato_Motorista: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Veiculos');
  },
};
