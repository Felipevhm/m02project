const { Router } = require("express");

const usuariosRoutes = require("./usuarios.routes");
const locaisRoutes = require("./locais.routes");
const LoginController = require('../controllers/LoginController')

const routes = new Router();

routes.use("/usuarios", usuariosRoutes);
routes.use("/locais", locaisRoutes);
routes.post('/login', LoginController.login)


module.exports = routes;
