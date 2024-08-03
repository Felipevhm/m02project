const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const usuariosRoutes = new Router();

usuariosRoutes.post('/', UsuarioController.create);
 usuariosRoutes.get('/', UsuarioController.searchAll);
usuariosRoutes.delete('/:id', UsuarioController.delete);
usuariosRoutes.put('/:id', UsuarioController.update);
 usuariosRoutes.get('/:id', UsuarioController.searchOne);

module.exports = usuariosRoutes;