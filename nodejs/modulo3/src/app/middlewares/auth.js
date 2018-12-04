//middleware para validar jwt
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
//promisify: lib nativa do node para transformar functions com callbacks em promises
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    //pegando o cabeçalho authorization da req, para ver se jwt foi informado
    const authorization = req.headers.authorization

    if(!authorization){
        return res.status(401).json({ error: 'Token not provided' })
    }

    //o header authorization quando enviado vai no padrao 'Bearer tokendiufhisdfhbs'; iremos pegar apenas o token de fato
    const [, token] = authorization.split(' ')
    
    //verificando de jwt está valido
    try {
        //promisify vai tornar possivel usar await para promisse; recebe o callback (jwt.verify) e os params desse calback (token, authConfig.secret)
        //jwt.verify recebe o token e a secret, retorna o token decodificado em caso de sucesso
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        
        //repassando o id do user logado q estava no jwt para dentro da requisicao
        req.userId = decoded.id

        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' })
    }

}