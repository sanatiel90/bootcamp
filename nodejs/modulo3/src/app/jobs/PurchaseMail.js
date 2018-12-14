const Mail = require('../services/Mail')

//job q fará envio do email
class PurchaseMail{
    //prop key q retorna a key identificadora desse job 
    get key () {
        return 'PurchaseMail'
    }

    //ação do job, nesse caso faz envio do email; 1º param: job, contem infos do job, como dados; 2º param: done, funcao q deve ser chamada no termino do handle
    async handle(job, done){
        //recuperando informacoes q foram enviadas e estao presentes no job.data
        const { ad, user, content } = job.data
        //enviando email
        await Mail.sendMail({
            from: 'Test' /* `"${user.name}" <${user.email}>`*/  /*'"Sanatiel Barros" <sanatiel@eu.com>' */ ,
            to: ad.author.email,
            subject: `Solicitação de compra: ${ad.title}`,
            template: 'purchase',   //template do email
            context: { user, content, ad }  //vars q ficarao acessiveis no template
        })

        return done()
    }
}


module.exports = new PurchaseMail()