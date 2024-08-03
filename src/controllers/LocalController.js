const Local = require("../models/Local");
const { Op } = require("sequelize");

class LocalController {
  async create(request, response) {
    const { nome, descricao, localidade, coordenadas, userId } = request.body;

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
      console.error("Error creating location:", error);
      return response.status(500).json({
        mensagem: "Error creating location",
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
        mensagem: "Unable to search for locations",
      });
    }
  }

  async update(request, response) {
    const { nome, cpf, email, senha, dataNascimento, endereco, sexo } =
      request.body;
    const errors = [];
    if (
      !nome &&
      !cpf &&
      !email &&
      !senha &&
      !dataNascimento &&
      !endereco &&
      !sexo
    ) {
      errors.push({
        msg: "It is necessary for the update to have at least one valid value of name, cpf, email, password, date of birth, address, or gender.",
        param: ["especialidade", "nome"],
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    try {
      const id = request.params.id;
      const dados = request.body;

      const local = await Local.findByPk(id);

      if (!local) {
        return response.status(404).json({
          mensagem: "No location found with this id",
        });
      }

      if (dados.nome) local.nome = dados.nome;
      if (dados.cpf) local.cpf = dados.cpf;
      if (dados.email) local.email = dados.email;
      if (dados.senha) local.senha = dados.senha;
      if (dados.dataNascimento) local.dataNascimento = dados.dataNascimento;
      if (dados.endereco) local.endereco = dados.endereco;
      if (dados.sexo) local.sexo = dados.sexo;

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
      const id = request.params.id;
      const local = await Local.findByPk(id);

      if (!local) {
        return response.status(404).json({
          mensagem: "No location found with this id",
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
}
module.exports = new LocalController();
