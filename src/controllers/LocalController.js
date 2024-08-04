const Local = require("../models/Local");
const { Op } = require("sequelize");

class LocalController {
  async create(request, response) {
    const { nome, descricao, localidade, coordenadas } = request.body;
    const userId = request.currentId;

    const errors = [];
    if (!nome) {
      errors.push({
        msg: "Location name is required and not null",
        param: "nome",
      });
    }

    if (!coordenadas) {
      errors.push({
        msg: "Location coordinates is required and not null",
        param: "coordenadas",
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
      console.error("Error creating location:", error);
      return response.status(500).json({
        mensagem: "Error creating location",
      });
    }
  }

  async searchAll(request, response) {
    try {
      const { nome, descricao, localidade, coordenadas } = request.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.like]: `%${nome}%` };
      }

      if (coordenadas) {
        where.coordenadas = { [Op.like]: `%${coordenadas}%` };
      }

      where.userId = request.currentId;

      const locais = await Local.findAll({ where });
      response.json(locais);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to search for locations",
      });
    }
  }

  async update(request, response) {

    const { nome, descricao, localidade, coordenadas } = request.body;
    const errors = [];
    if (!nome && !descricao && !localidade && !coordenadas) {
      errors.push({
        msg: "It is necessary for the update to have at least one valid value of name, description, location or coordinates .",
        param: ["name"],
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    const where = { userId: request.currentId };
    try {
      const localId = request.params.id;
      const local = await Local.findByPk(localId, { where });

      if (!local) {
        return response.status(404).json({
          mensagem: "No location found with this id",
        });
      }

      if (!(local.userId === request.currentId)) {
        return response.status(401).json({
          mensagem: "User does not have permission to update this location",
        });
      }

      if (nome) local.nome = nome;
      if (descricao) local.descricao = descricao;
      if (localidade) local.localidade = localidade;
      if (coordenadas) local.coordenadas = coordenadas;
      local.userId = request.currentId;

      await local.save();

      response.json(local);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to update location",
      });
    }
  }

  async delete(request, response) {
    try {
      const where = { userId: request.currentId };
      const id = request.params.id;
      const local = await Local.findByPk(id,{where});

      if (!local) {
        return response.status(404).json({
          mensagem: "No location found with this id",
        });
      }

      if (!(local.userId === request.currentId)) {
        return response.status(401).json({
          mensagem: "User does not have permission to delete this location",
        });
      }

      await local.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to retrieve location",
      });
    }
  }

  async searchOne(request, response) {
    const id = request.params.id;
    const local = await Local.findByPk(id);

    if (!local) {
      return response.status(404).json({
        mensagem: "No location found with this id",
      });
    }

    response.json(local);
  }
}
module.exports = new LocalController();
