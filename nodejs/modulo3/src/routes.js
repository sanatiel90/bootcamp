const express = require('express')

const validate = require('express-validation')

const routes = express.Router()
//lib usada para q as promisses acessadas via async/await possam enviar os erros q ocorrem nelas
//esse handler vai precisar ser colocado em todos as chamadas de controllers à metodos que usam async/await 
const handler = require('express-async-handler')
/*
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
*/
//importando pasta completa
const controllers = require('./app/controllers')
//importando validators
const validators = require('./app/validators')


const authMiddleware = require('./app/middlewares/auth')

//usando middlewares de validacao
routes.get('/users', handler(controllers.UserController.index))
routes.post('/users', validate(validators.User), handler(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handler(controllers.SessionController.store))

//daqui pra baixo usar esse middleware
routes.use(authMiddleware)

routes.get('/ads', handler(controllers.AdController.index))
routes.post('/ads', validate(validators.Ad), handler(controllers.AdController.store))
routes.get('/ads/:id', handler(controllers.AdController.show))
routes.put('/ads/:id', validate(validators.Ad), handler(controllers.AdController.update))
routes.delete('/ads/:id', handler(controllers.AdController.destroy))

routes.get('/purchases', handler(controllers.PurchaseController.index))
routes.post('/purchases', validate(validators.Purchase), handler(controllers.PurchaseController.store))
//rota para vendedor indicar que aceitou a purchase feita por um usuario
routes.put('/purchases/:id', validate(validators.Purchase), handler(controllers.PurchaseController.update))


module.exports = routes