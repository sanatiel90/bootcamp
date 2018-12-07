const Ad = require('../models/Ad')
const User = require('../models/User')
const Queue = require('../services/Queue') //importa fila
const PurchaseMail = require('../jobs/PurchaseMail') // importa job q vai ser add na fila

//controller para solicitacpes de compras dos anuncios
class PurchaseController {

    async store(req, res){
        //no pedido pelo anuncio, sera enviado na req o id do anuncio e uma msg content
        const { ad, content } = req.body
        //recuperando ad solicitado e user logado
        const purchasedAd = await Ad.findById(ad).populate('author') //usando populate para trazer tbm os dados do relacionamento com author
        const user = await User.findById(req.userId)

        //add PurchaseMail à fila e executa; no 2º param passa valores q serao usados dentro da job
        Queue.create(PurchaseMail.key, {
            ad: purchasedAd,
            user,
            content
        }).save()


        return res.send()
    }

}

module.exports = new PurchaseController()