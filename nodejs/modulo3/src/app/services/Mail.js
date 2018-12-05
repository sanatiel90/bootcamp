const nodemailer = require('nodemailer')
const mailConfig = require('../../config/mail')
const path = require('path')
//handlebars: template engine mais simples q nunjucks q vai ser usada para criar um template para o email a ser enviado
const hbs = require('nodemailer-express-handlebars')
//exphbs: trabalha em conjunto com handlebars
const exphbs = require('express-handlebars')

//cria a conexao de transporte de email usando a lib nodemailer e um arq de config 
const transport = nodemailer.createTransport(mailConfig)

//definindo q o email usara o template, o local onde estarao os templates e a extensao deles 
transport.use('compile', hbs({
    viewEngine: exphbs(),
    viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
    extName: '.hbs'
}))

module.exports = transport 

