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
        msg: "Nome do usuário é obrigatório e não nulo",
        param: "nome",
      });
    }
    if (!cpf) {
      errors.push({
        msg: "CPF do usuário é obrigatório e não nulo",
        param: "cpf",
      });
    }
    if (!email) {
      errors.push({
        msg: "Email do usuário é obrigatório e não nulo",
        param: "email",
      });
    }
    if (!senha ) {
      errors.push({
        msg: "Senha do usuário é obrigatória e não nula",
        param: "senha",
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
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
        mensagem: "Não foi possível criar o usuario",
      });
    }
  }

  async searchAll(request, response) {
    try {
      const {nome, cpf, email, dataNascimento, endereco, sexo  } = request.query;
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
      console.log('query IS:');
      console.log(request.query);

      const usuarios = await Usuario.findAll({ where });
      response.json(usuarios);
    } catch (error) {
      response.status(500).json({
        mensagem: "Não foi possível buscar os usuarios",
      });
    }
  }

  async update(request, response) {
    const { nome, cpf, email, senha, dataNascimento, endereco, sexo } = request.body;
    const errors = [];
    if ((!nome && !cpf && !email && !senha && !dataNascimento && !endereco && !sexo)) {
      errors.push({
        msg: "É necessário para a atualização ao menos um valor válido de nome, cpf, email, senha, data de nascimento, endereco ou sexo.",
        param: ["especialidade", "nome"],
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
          mensagem: "Não foi encontrado um usuario com esse id",
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
        mensagem: "Não foi possível atualizar o usuario",
      });
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return response.status(404).json({
          mensagem: "Não foi encontrado um usuario com esse id",
        });
      }

      await usuario.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Não foi possível buscar o usuario",
      });
    }
  }

  async searchOne(request, response) {
    const id = request.params.id;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return response.status(404).json({
        mensagem: "Não foi encontrado um usuario com esse id",
      });
    }

    response.json(usuario);
  }
}

module.exports = new UsuarioController();
