const Local = require("../models/Local");
const { Op } = require("sequelize");
const { getMapLocal, getGoogleMapsLink } = require("../services/map.service");

class LocalController {
  async create(request, response) {
    const { nome, cep } = request.body;
    let { coordenadas, descricao, localidade } = request.body;
    const userId = request.currentId;
    const errors = [];

    if (!coordenadas) {
      const mapResult = await getMapLocal(cep);
      if (!mapResult || !mapResult.lat || !mapResult.lon) {
        return response.status(400).json({
          msg: "Invalid coordinates",
          param: "coordenadas",
        });
      }
      coordenadas = `${mapResult.lat},${mapResult.lon}`;
    }

    const [coordinateLat, coordinateLon] = coordenadas.split(",");
    const googleMapsLink = await getGoogleMapsLink({
      coordinateLat,
      coordinateLon,
    });
    if (!googleMapsLink) {
      return response.status(400).json({
        msg: "No location found in GoogleMaps",
        param: "googleMapsLink",
      });
    }

    if (!nome) {
      errors.push({ msg: "Location name is required", param: "nome" });
    }

    if (!cep) {
      errors.push({ msg: "Location cep is required", param: "cep" });
    }

    if (!descricao) {
      descricao = "";
    }
    if (!localidade) {
      localidade = "";
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    try {
      const local = await Local.create({
        nome,
        descricao,
        cep,
        userId,
        localidade,
        coordenadas,
        googleMapsLink,
      });
      return response.status(201).json(local);
    } catch (error) {
      console.error("Error creating new location:", error);
      return response
        .status(500)
        .json({ message: "Error creating new location", error: error.message });
    }
  }

  async searchAll(request, response) {
    try {
      const { nome, descricao, localidade, coordenadas, cep, googleMapsLink } =
        request.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.like]: `%${nome}%` };
      }

      if (coordenadas) {
        where.coordenadas = { [Op.like]: `%${coordenadas}%` };
      }

      if (cep) {
        where.cep = { [Op.like]: `%${cep}%` };
      }
      if (googleMapsLink) {
        where.googleMapsLink = { [Op.like]: `%${googleMapsLink}%` };
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
    const { nome, descricao, localidade, coordenadas, cep, googleMapsLink } =
      request.body;
    const errors = [];
    if (
      !nome &&
      !descricao &&
      !localidade &&
      !coordenadas &&
      !cep &&
      !googleMapsLink
    ) {
      errors.push({
        msg: "It is necessary for the update to have at least one valid value of name, description, location, coordinates, CEP or googleMapsLink.",
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
      if (cep) local.cep = cep;
      if (googleMapsLink) local.googleMapsLink = googleMapsLink;

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
      const local = await Local.findByPk(id, { where });

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
    const where = { userId: request.currentId };

    const localId = request.params.id;
    const local = await Local.findByPk(localId, { where });

    if (!local) {
      return response.status(404).json({
        mensagem: "No location found with this id",
      });
    }

    console.log("local.userId:");
    console.log(local.userId);
    console.log("request.currentId:");
    console.log(request.currentId);

    if (!(local.userId === request.currentId)) {
      return response.status(401).json({
        mensagem:
          "User does not have permission to read the specified location information",
      });
    }

    response.json(local);
  }

  async searchOneMap(request, response) {
    const where = { userId: request.currentId };

    const localId = request.params.id;
    const local = await Local.findByPk(localId, { where });

    if (!local) {
      return response.status(404).json({
        mensagem: "No location found with this id",
      });
    }
    if (!(local.userId === request.currentId)) {
      return response.status(401).json({
        mensagem:
          "User does not have permission to read the specified location information",
      });
    }
    const nome = local.nome;
    const googleMapsLink = local.googleMapsLink;
    response.json({ nome, googleMapsLink });
  }
}
module.exports = new LocalController();
