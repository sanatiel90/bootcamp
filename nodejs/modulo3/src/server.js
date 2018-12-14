//LIB para acessar var de ambient definidas no .env atraves de 'process.env'
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const Youch = require('youch') //lib para retornar erros mais detalhados quando em ambiente de desenvolvimento
const validate = require('express-validation') 
const Sentry = require('@sentry/node'); //ferramenta de terceiros para monitar erros em producao
const sentryConfig = require('./config/sentry')
 
class App {
    constructor(){
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production' 

        this.sentry()
        this.database()
        this.middlewares()
        this.routes()
        this.exception()
        
    }

    sentry(){
        //iniciando sentry
        Sentry.init(sentryConfig)
    }

    database(){
        //conecatando mongoose
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares(){ 
        //para aceitar json nas req
        this.express.use(express.json())
        //add middleware do sentry
        this.express.use(Sentry.Handlers.requestHandler())
    }

    routes(){
        this.express.use(require('./routes'))
    }

    exception(){
        //se houve erro em producao, usar MIDDLEWARE do sentry
        // if(process.env.NODE_ENV === 'production'){
            this.express.use(Sentry.Handlers.errorHandler())
        // }     
        
        //usndo um middleware para tratar as excecoes; pra esse caso o middleware precisa receber 4 params, sendo o 
        //primeiro o erro q ocorreu 
        this.express.use( async (err, req, res, next) => {
           
            //se houve algum erro de validacao dos dados enviados à api, retornar uma msg de erro mais legível
            if(err instanceof validate.ValidationError){
                return res.status(err.status).json(err)
            }

            //usando Youch para retornar erro mais detalhado em caso de ambiente desenv
            if(process.env.NODE_ENV !== 'production'){
                //se estiver em dev env, cria instancia de Youch com base no erro q veio 
                const youch = new Youch(err)
                //retorna o erro detalhado em json; para transformar o youch em json precisa acessar o met toJSON()
                //usando async await pois se trata de uma promisse 
                return res.json(await youch.toJSON())
            }

            //caso nao haja um erro de validacao e msm assim for retornado um erro, retornar como erro interno do servidor
            return res.status(err.status || 500).json({error: 'Internal Server Error'})
        })
    }

}

module.exports = new App().express

