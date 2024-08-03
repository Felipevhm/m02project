const Usuario = require("../models/Usuario");
const { Op } = require("sequelize");

class UsuarioController {
  async criar(request, response) {
    const { nome, sexo, cpf, endereco, email, senha, dataNascimento } =
      request.body;
    // Validações manuais
    const errors = [];
    if (!nome) {
      errors.push({ msg: "Nome do usuário é obrigatório", param: "nome" });
    }
    if (!cpf) {
      errors.push({
        msg: "CPF do usuário é obrigatório",
        param: "cpf",
      });
    }
    if (!email) {
      errors.push({
        msg: "Email do usuário é obrigatório",
        param: "email",
      });
    }
    if (!senha) {
      errors.push({
        msg: "Senha do usuário é obrigatória",
        param: "senha",
      });
    }

    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    try {
      const usuario = await Usuario.create({ nome, cpf, email, senha });
      return response.status(201).json(usuario);
    } catch (error) {
      response.status(500).json({
        mensagem: "Não foi possível criar o usuario",
      });
    }
  }

  // async buscarTodos(request, response) {
  //   try {
  //     const { nome, especialidade } = request.query;
  //     const where = {};

  //     if (nome) {
  //       where.nome = { [Op.like]: `%${nome}%` };
  //     }

  //     if (especialidade) {
  //       where.especialidade = { [Op.like]: `%${especialidade}%` };
  //     }

  //     const usuarios = await Usuario.findAll({ where });
  //     response.json(usuarios);
  //   } catch (error) {
  //     response.status(500).json({
  //       mensagem: "Não foi possível buscar os usuarios",
  //     });
  //   }
  // }

  // async atualizar(request, response) {
  //   const { nome, especialidade } = request.body;
  //   const errors = [];
  //   if (!nome && !especialidade) {
  //     errors.push({
  //       msg: "É necessário para a atualização ao menos um nome válido ou uma especialidade válida.",
  //       param: ["especialidade", "nome"],
  //     });
  //   }

  //   if (errors.length > 0) {
  //     return response.status(400).json({ errors });
  //   }

  //   try {
  //     const id = request.params.id;
  //     const dados = request.body;

  //     const usuario = await Usuario.findByPk(id);

  //     if (!usuario) {
  //       return response.status(404).json({
  //         mensagem: "Não foi encontrado um usuario com esse id",
  //       });
  //     }

  //     if (dados.nome) usuario.nome = dados.nome;
  //     if (dados.especialidade) usuario.especialidade = dados.especialidade;

  //     await usuario.save();

  //     response.json(usuario);
  //   } catch (error) {
  //     response.status(500).json({
  //       mensagem: "Não foi possível atualizar o usuario",
  //     });
  //   }
  // }

  // async deletar(request, response) {
  //   try {
  //     const id = request.params.id;
  //     const usuario = await Usuario.findByPk(id);

  //     if (!usuario) {
  //       return response.status(404).json({
  //         mensagem: "Não foi encontrado um usuario com esse id",
  //       });
  //     }

  //     await usuario.destroy();

  //     response.status(204).json();
  //   } catch (error) {
  //     response.status(500).json({
  //       mensagem: "Não foi possível buscar o usuario",
  //     });
  //   }
  // }

  // async buscarUm(request, response) {
  //   const id = request.params.id;
  //   const usuario = await Usuario.findByPk(id);

  //   if (!usuario) {
  //     return response.status(404).json({
  //       mensagem: "Não foi encontrado um usuario com esse id",
  //     });
  //   }

  //   response.json(usuario);
  // }
}

module.exports = new UsuarioController();
