'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locals', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nome: { type: Sequelize.STRING },
      descricao: { type: Sequelize.STRING },
      localidade: { type: Sequelize.STRING },
      coordenadas: { type: Sequelize.GEOGRAPHY },
      userId: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' }},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locals');
  }
};
