//validators: irao fazer validacao dos dados enviados
//joi: lib para validacao de Schemas
const Joi = require('joi')

module.exports = {
    //podem ser validados o body, params e query da requisicao
    body: {
        name: Joi.string().required(), //usando joi para definir validacoes dos campos 
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5)
    }

}