const { Router } = require("express");

const usuariosRoutes = require("./usuarios.routes");
const localRoutes = require("./local.routes");
const LoginController = require('../controllers/LoginController')

const routes = new Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use("/usuario", usuariosRoutes);
routes.use("/local", localRoutes);
routes.post('/login', 
   /* 
     #swagger.tags = ['Login'],
     #swagger.description = 'Endpoint para login',
     #swagger.parameters['login'] = {
         in: 'body',
         description: 'Credenciais de login',
         required: true,
         schema: {
             $email: "teste@gmail.com",
             $senha: "teste123"
         }
     }
     #swagger.responses[200] = {
         description: 'Login bem sucedido',
         schema: {
             token: "token_jwt",
             name: "Nome do Usuário"
         }
     }
     #swagger.responses[400] = {
         description: 'Email e senha são obrigatórios',
         schema: { message: "Email and password are required" }
     }
     #swagger.responses[404] = {
         description: 'Conta não encontrada',
         schema: { message: "Account not found" }
     }
     #swagger.responses[500] = {
         description: 'Erro ao fazer login',
         schema: { message: "Error logging in" }
     }
   */
   LoginController.login
 );


module.exports = routes;
