const { Router } = require("express");

const usuariosRoutes = require("./usuarios.routes");
const locaisRoutes = require("./locais.routes");


const routes = new Router();

routes.use("/usuarios", usuariosRoutes);
routes.use("/locais", locaisRoutes);


module.exports = routes;
