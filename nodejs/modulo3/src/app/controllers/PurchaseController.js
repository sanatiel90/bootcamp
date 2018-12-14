const Ad = require('../models/Ad')
const User = require('../models/User')
const Queue = require('../services/Queue') //importa fila
const PurchaseMail = require('../jobs/PurchaseMail') // importa job q vai ser add na fila
const Purchase = require('../models/Purchase')

//controller para solicitacpes de compras dos anuncios
class PurchaseController {

    async index(req, res){
        const user = req.userId                                                         
        const purchases = await Purchase
                .find( {ad: await Ad.find({ author: user }) } ) //não deve ser melhor forma mas funcionou: pegar apenas as purchases cujos ads sejam do usuario logado
                 .populate('author')
                .populate({ path: 'ad', populate: { path: 'author' } })  //populate dentro de populate, para pegar dados do ad dentro de purchase, e do author dentro do ad
        return res.json(purchases)
    }

    async store(req, res){
        //no pedido pelo anuncio, sera enviado na req o id do anuncio e uma msg content
        const { ad, content } = req.body
        //recuperando ad solicitado e user logado
        const purchasedAd = await Ad.findById(ad).populate('author') //usando populate para trazer tbm os dados do relacionamento com author
        const user = await User.findById(req.userId)

        //salvando purchase no banco
        const purchase = await Purchase.create({
            content,
            ad: purchasedAd,
            author: user
        })

        //add PurchaseMail à fila e executa; no 2º param passa valores q serao usados dentro da job
        Queue.create(PurchaseMail.key, {
            ad: purchasedAd,
            user,
            content
        }).save()


        return res.send()
    }

    async update(req, res){ 
        //recuperando a purchase q vai ser vendida
        const purchase = await Purchase.findById(req.params.id).populate('ad')
        //recuperando o ad q vai ser vendido na purchase e atualizando no ad a venda
        const ad = await Ad.findByIdAndUpdate(purchase.ad.id, {
            purchasedBy: purchase.id 
        }, 
        {
            new: true
        } )

        return res.json(ad)

    }

}

module.exports = new PurchaseController()