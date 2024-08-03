const Local = require("../models/Local");
const { Op } = require("sequelize");

class LocalController {
  async create(request, response) {
    const { nome, descricao, localidade, coordenadas, userId } = request.body;

    const errors = [];
    if (!nome) {
      errors.push({
        msg: "Place name is required and not null",
        param: "nome",
      });
    }

    if (!coordenadas) {
      errors.push({
        msg: "Place coordinates is required and not null",
        param: "coordenadas",
      });
    }

    if (!userId) {
      errors.push({
        msg: "The id of the owner user is required and not null",
        param: "userId",
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    try {
      const local = await Local.create({
        nome,
        descricao,
        localidade,
        coordenadas,
        userId,
      });
      return response.status(201).json(local);
    } catch (error) {
      console.error("Error creating place:", error);
      return response.status(500).json({
        mensagem: "Error creating place",
      });
    }
  }

  async searchAll(request, response) {
    try {
      const { nome, descricao, localidade, coordenadas, userId } =
        request.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.like]: `%${nome}%` };
      }

      if (coordenadas) {
        where.coordenadas = { [Op.like]: `%${coordenadas}%` };
      }

      if (userId) {
        where.userId = userId;
      }

      console.log("query IS:");
      console.log(request.query);

      const locais = await Local.findAll({ where });
      response.json(locais);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to search for places",
      });
    }
  }
}

module.exports = new LocalController();
