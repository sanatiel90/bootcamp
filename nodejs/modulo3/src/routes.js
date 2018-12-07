const express = require('express')

const validate = require('express-validation')

const routes = express.Router()
/*
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
*/
//importando pasta completa
const controllers = require('./app/controllers')
//importando validators
const validators = require('./app/validators')


const authMiddleware = require('./app/middlewares/auth')

//routes.get('/users', controllers.UserController.index)
//usando middlewares de validacao
routes.post('/users', validate(validators.User), controllers.UserController.store)
routes.post('/sessions', validate(validators.Session), controllers.SessionController.store)

//daqui pra baixo usar esse middleware
routes.use(authMiddleware)

routes.get('/ads', controllers.AdController.index)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.get('/ads/:id', controllers.AdController.show)
routes.put('/ads/:id', validate(validators.Ad), controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

routes.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.store)


module.exports = routes