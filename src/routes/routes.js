const { Router } = require("express");

const usuariosRoutes = require("./usuarios.routes");
const locaisRoutes = require("./locais.routes");
const LoginController = require('../controllers/LoginController')

const routes = new Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use("/usuario", usuariosRoutes);
routes.use("/local", locaisRoutes);
routes.post('/login', LoginController.login)


module.exports = routes;
