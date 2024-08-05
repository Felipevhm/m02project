"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Locations",
      [
        {
          nome: "Centro",
          descricao: "",
          localidade: "R.Vitor Konder",
          coordenadas: "",
          userId: 1,
          cep: "88015400",
          googleMapsLink: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Trindade",
          descricao: "",
          localidade: "R.Santa Luzia",
          coordenadas: "",
          userId: 1,
          cep: "88036540",
          googleMapsLink: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Lagoa da Conceição",
          descricao: "",
          localidade: "R.Moacir Pereira Junior",
          coordenadas: "",
          userId: 2,
          cep: "88062120",
          googleMapsLink: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Coqueiros",
          descricao: "",
          localidade: "R. Bento Góia",
          coordenadas: "",
          userId: 2,
          cep: "88080150",
          googleMapsLink: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Canasvieiras",
          descricao: "",
          localidade: "R. Rodolfo Hickel",
          coordenadas: "",
          userId: 3,
          cep: "88054040",
          googleMapsLink: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Locations", null, {});
  },
};
