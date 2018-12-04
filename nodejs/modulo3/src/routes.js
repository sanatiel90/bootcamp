const express = require('express')

const routes = express.Router()
/*
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
*/
//importando pasta completa
const controllers = require('./app/controllers')

const authMiddleware = require('./app/middlewares/auth')

//routes.get('/users', controllers.UserController.index)
routes.post('/users', controllers.UserController.store)
routes.post('/sessions', controllers.SessionController.store)

//daqui pra baixo usar esse middleware
routes.use(authMiddleware)

routes.get('/ads', controllers.AdController.index)
routes.post('/ads', controllers.AdController.store)
routes.get('/ads/:id', controllers.AdController.show)
routes.put('/ads/:id', controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

module.exports = routes