const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

//controller para solicitacpes de compras dos anuncios
class PurchaseController {

    async store(req, res){
        //no pedido pelo anuncio, sera enviado na req o id do anuncio e uma msg content
        const { ad, content } = req.body
        //recuperando ad solicitado e user logado
        const purchasedAd = await Ad.findById(ad).populate('author') //usando populate para trazer tbm os dados do relacionamento com author
        const user = await User.findById(req.userId)

        //enviando email
        await Mail.sendMail({
            from: '"Sanatiel Barros" <sanatiel@eu.com>',
            to: purchasedAd.author.email,
            subject: `Solicitação de compra: ${purchasedAd.title}`,
            template: 'purchase',   //template do email
            context: { user, content, ad: purchasedAd }  //vars q ficarao acessiveis no template
        })

        return res.send()
    }

}

module.exports = new PurchaseController()