
const { Router } = require('express')

const usuariosRoutes = require('./usuarios.routes')


const routes = new Router()

routes.use('/usuarios', usuariosRoutes)

// routes.use('/cursos', cursosRoutes)

module.exports = routes