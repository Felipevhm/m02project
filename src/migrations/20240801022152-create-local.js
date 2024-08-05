'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nome: { type: Sequelize.STRING },
      descricao: { type: Sequelize.STRING },
      cep: { allowNull: false, type: Sequelize.STRING },
      userId: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' }},
      localidade: { type: Sequelize.STRING },
      coordenadas: { type: Sequelize.TEXT },
      googleMapsLink: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};
