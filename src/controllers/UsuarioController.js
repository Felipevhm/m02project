const Usuario = require("../models/Usuario");
const { Op } = require("sequelize");

class UsuarioController {
  async create(request, response) {
    console.log("request IS:");
    console.dir(request.body);

    const { nome, cpf, email, senha, dataNascimento, endereco, sexo } =
      request.body;

    const errors = [];
    if (!nome) {
      errors.push({
        msg: "User name is required and not null",
        param: "nome",
      });
    }
    if (!cpf) {
      errors.push({
        msg: "CPF is required and not null",
        param: "cpf",
      });
    }
    if (!email) {
      errors.push({
        msg: "Email is required and not null",
        param: "email",
      });
    }
    if (!senha) {
      errors.push({
        msg: "User password is required and not null",
        param: "senha",
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    const existingUser = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return response.status(409).json({ message: "Account already exists" });
    }

    try {
      const usuario = await Usuario.create({
        nome,
        cpf,
        email,
        senha,
        dataNascimento,
        endereco,
        sexo,
      });
      return response.status(201).json(usuario);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to create user",
      });
    }
  }

  async searchAll(request, response) {
    try {
      const { nome, cpf, email, dataNascimento, endereco, sexo } =
        request.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.like]: `%${nome}%` };
      }

      if (cpf) {
        where.cpf = { [Op.like]: `%${cpf}%` };
      }

      if (email) {
        where.email = { [Op.like]: `%${email}%` };
      }
      if (dataNascimento) {
        where.dataNascimento = { [Op.like]: `%${dataNascimento}%` };
      }

      if (endereco) {
        where.endereco = { [Op.like]: `%${endereco}%` };
      }

      if (sexo) {
        where.sexo = { [Op.like]: `%${sexo}%` };
      }
      console.log("query IS:");
      console.log(request.query);

      const usuarios = await Usuario.findAll({ where });
      response.json(usuarios);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to search for users",
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
        msg: "At least one of the following must be a valid update value: name, cpf, email, password, birth date, address or gender.",
        param: ["nome"],
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    try {
      const id = request.params.id;
      const dados = request.body;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "User id not found",
        });
      }

      if (dados.nome) usuario.nome = dados.nome;
      if (dados.cpf) usuario.cpf = dados.cpf;
      if (dados.email) usuario.email = dados.email;
      if (dados.senha) usuario.senha = dados.senha;
      if (dados.dataNascimento) usuario.dataNascimento = dados.dataNascimento;
      if (dados.endereco) usuario.endereco = dados.endereco;
      if (dados.sexo) usuario.sexo = dados.sexo;

      await usuario.save();

      response.json(usuario);
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to update user",
      });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "User with the given id was not found",
        });
      }

      await usuario.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Unable to search for user",
      });
    }
  }

  async searchOne(request, response) {
    const id = request.params.id;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return response.status(404).json({
        mensagem: "Unable to find an user with the given id",
      });
    }

    response.json(usuario);
  }
}

module.exports = new UsuarioController();
