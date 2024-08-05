"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          nome: "User One",
          sexo: "M",
          cpf: "12345678901",
          endereco: "123 Main St",
          email: "user1@example.com",
          senha: "password1",
          dataNascimento: new Date(1990, 0, 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "User Two",
          sexo: "F",
          cpf: "23456789012",
          endereco: "456 Elm St",
          email: "user2@example.com",
          senha: "password2",
          dataNascimento: new Date(1991, 1, 2),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "User Three",
          sexo: "M",
          cpf: "34567890123",
          endereco: "789 Oak St",
          email: "user3@example.com",
          senha: "password3",
          dataNascimento: new Date(1992, 2, 3),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "User Four",
          sexo: "F",
          cpf: "45678901234",
          endereco: "101 Pine St",
          email: "user4@example.com",
          senha: "password4",
          dataNascimento: new Date(1993, 3, 4),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "User Five",
          sexo: "M",
          cpf: "56789012345",
          endereco: "202 Maple St",
          email: "user5@example.com",
          senha: "password5",
          dataNascimento: new Date(1994, 4, 5),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
