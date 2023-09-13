'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Escolas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Endereço_Completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Contato_Escola: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Pontos_Embarque_Desembarque: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Informações_Motoristas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_Gestor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user', // Nome da tabela de referência (Usuários)
          key: 'id', // Nome da coluna de referência (ID)
        },
      },
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Escolas');
  },
};
