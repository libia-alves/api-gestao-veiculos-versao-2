'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'Veiculos',
      'id_Rotas',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: { model: 'Rotas', key: 'id' },
      }
    );


  await queryInterface.addColumn(
      'Veiculos',
      'id_Horario',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: { model: 'Horarios', key: 'id' },
      }
    );



  await queryInterface.addColumn(
      'Veiculos',
      'id_Escolas',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: { model: 'Escolas', key: 'id' },
      }
    );
  },




  async down (queryInterface, Sequelize) {
      

    await queryInterface.removeColumn('Veiculos', 'id_Rotas');
  
    await queryInterface.removeColumn('Veiculos', 'id_Horario');
  
    await queryInterface.removeColumn('Veiculos', 'id_Escolas');
  

  }
};
