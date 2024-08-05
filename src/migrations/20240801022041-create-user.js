'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nome: { type: Sequelize.STRING, allowNull: false,  },
      sexo: { type: Sequelize.STRING },
      cpf: { type: Sequelize.STRING, unique: true , allowNull: false, },
      endereco: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, unique: true, allowNull: false, },
      senha: { type: Sequelize.STRING, allowNull: false, },
      dataNascimento: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};