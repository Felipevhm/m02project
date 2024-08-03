const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuariosRoutes = new Router();

usuariosRoutes.post('/', UsuarioController.criar);
// usuariosRoutes.get('/', UsuarioController.buscarTodos);
// usuariosRoutes.delete('/:id', UsuarioController.deletar);
// usuariosRoutes.put('/:id', UsuarioController.atualizar);
// usuariosRoutes.get('/:id', UsuarioController.buscarUm);

module.exports = usuariosRoutes;