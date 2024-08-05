const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const checkUserHasLocal = require('../middlewares/checkUserHasLocal');

const usuariosRoutes = new Router();

usuariosRoutes.post('/',
  /* 
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para criar um usuário',
    #swagger.parameters['criarUsuario'] = {
        in: 'body',
        description: 'Dados do usuário',
        required: true,
        schema: {
            $nome: "Usuario Teste",
            $email: "teste@gmail.com",
            $senha: "teste123",
            $cpf: "12345678900",
            dataNascimento: "2000-01-01",
            endereco: "Rua Teste, 123",
            sexo: "M"
        }
    }
    #swagger.responses[201] = {
        description: 'Usuário criado com sucesso',
        schema: {
            id: 1,
            nome: "Usuario Teste",
            email: "teste@gmail.com",
            cpf: "12345678900",
            dataNascimento: "2000-01-01",
            endereco: "Rua Teste, 123",
            sexo: "M"
        }
    }
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados',
        schema: { errors: [{ msg: "Mensagem de erro", param: "campo" }] }
    }
    #swagger.responses[409] = {
        description: 'Conta já existe',
        schema: { message: "Account already exists" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao criar usuário',
        schema: { mensagem: "Unable to create user" }
    }
  */
  UsuarioController.create
);

usuariosRoutes.get('/',
  /* 
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para buscar todos os usuários',
    #swagger.parameters['nome'] = { in: 'query', description: 'Nome do usuário', required: false }
    #swagger.parameters['cpf'] = { in: 'query', description: 'CPF do usuário', required: false }
    #swagger.parameters['email'] = { in: 'query', description: 'Email do usuário', required: false }
    #swagger.parameters['dataNascimento'] = { in: 'query', description: 'Data de nascimento do usuário', required: false }
    #swagger.parameters['endereco'] = { in: 'query', description: 'Endereço do usuário', required: false }
    #swagger.parameters['sexo'] = { in: 'query', description: 'Sexo do usuário', required: false }
    #swagger.responses[200] = {
        description: 'Usuários buscados com sucesso',
        schema: [{ 
            id: 1,
            nome: "Usuario Teste",
            email: "teste@gmail.com",
            cpf: "12345678900",
            dataNascimento: "2000-01-01",
            endereco: "Rua Teste, 123",
            sexo: "M"
        }]
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar usuários',
        schema: { mensagem: "Unable to search for users" }
    }
  */
  UsuarioController.searchAll
);

usuariosRoutes.put('/:id',
  /* 
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para atualizar um usuário',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do usuário', required: true }
    #swagger.parameters['atualizarUsuario'] = {
        in: 'body',
        description: 'Dados do usuário para atualizar',
        required: true,
        schema: {
            nome: "Usuario Atualizado",
            email: "atualizado@gmail.com",
            senha: "atualizado123",
            cpf: "12345678901",
            dataNascimento: "2000-02-02",
            endereco: "Rua Atualizada, 123",
            sexo: "F"
        }
    }
    #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso',
        schema: {
            id: 1,
            nome: "Usuario Atualizado",
            email: "atualizado@gmail.com",
            cpf: "12345678901",
            dataNascimento: "2000-02-02",
            endereco: "Rua Atualizada, 123",
            sexo: "F"
        }
    }
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados',
        schema: { errors: [{ msg: "Mensagem de erro", param: "campo" }] }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado',
        schema: { mensagem: "User id not found" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao atualizar usuário',
        schema: { mensagem: "Unable to update user" }
    }
  */
  UsuarioController.update
);

usuariosRoutes.delete('/:id', 
  checkUserHasLocal,
  /* 
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para deletar um usuário',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do usuário', required: true }
    #swagger.responses[204] = {
        description: 'Usuário deletado com sucesso'
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado',
        schema: { mensagem: "User with the given id was not found" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao deletar usuário',
        schema: { mensagem: "Unable to search for user" }
    }
  */
  UsuarioController.delete
);

usuariosRoutes.get('/:id',
  /* 
    #swagger.tags = ['Usuários'],
    #swagger.description = 'Endpoint para buscar um usuário pelo ID',
    #swagger.parameters['id'] = { in: 'path', description: 'ID do usuário', required: true }
    #swagger.responses[200] = {
        description: 'Usuário buscado com sucesso',
        schema: {
            id: 1,
            nome: "Usuario Teste",
            email: "teste@gmail.com",
            cpf: "12345678900",
            dataNascimento: "2000-01-01",
            endereco: "Rua Teste, 123",
            sexo: "M"
        }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado',
        schema: { mensagem: "Unable to find an user with the given id" }
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar usuário',
        schema: { mensagem: "Unable to search for user" }
    }
  */
  UsuarioController.searchOne
);

module.exports = usuariosRoutes;
