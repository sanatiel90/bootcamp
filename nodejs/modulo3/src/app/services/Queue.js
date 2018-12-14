//definie serviço para criar queues(filas)
//lib para criar filas
const kue = require('kue') 
const redisConfig = require('../../config/redis')
const Sentry = require('@sentry/node') //sentry para monitorar erros durante a fila
//pegando todos os jobs
const jobs = require('../jobs')

//cria uma fila com base nas config do redis
const Queue = kue.createQueue({ redis: redisConfig })

//processa um job na fila; 1º param: key do job; 2º param: ação do job
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

//em caso de erro na fila capturar a excecao no sentry
Queue.on('error', Sentry.captureException)

module.exports = Queue
