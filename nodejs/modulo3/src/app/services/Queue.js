//definie serviço para criar queues(filas)
//lib para criar filas
const kue = require('kue') 
const redisConfig = require('../../config/redis')
//pegando todos os jobs
const jobs = require('../jobs')

//cria uma fila com base nas config do redis
const Queue = kue.createQueue({ redis: redisConfig })

//processa um job na fila; 1º param: key do job; 2º param: ação do job
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)


module.exports = Queue
