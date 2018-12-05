const Ad = require('../models/Ad')

class AdController {
    async index(req, res){           
        //obj q vai guardar os filtros, q serao informados vai query param
        const filters = {}

        //verifica se foram informados filtros por preço minimo ou maximo; esses filtros devem ser definidos pelo desenvolvedor da api
        //no exemplo, criamos um filtro para preço minimo(price_min) e maximo(price_max) q será aplicado caso eles tenham sido passados na query param
        if(req.query.price_min || req.query.price_max){
            filters.price = {}

            if(req.query.price_min){
                //$gte: greater then - prop do moongoose q funciona como sinal de maior q '>'
                filters.price.$gte = req.query.price_min 
            }

            if(req.query.price_max){
                //$lte: lower then - prop do moongoose q funciona como sinal de menor q '<'
                filters.price.$lte = req.query.price_max
            }
        }

        //verif se tem filtros por titulo
        if(req.query.title){
            //para filtro por text cria-se uma RegExp com o nome informado; o 'i' é para case-insensitive
            filters.title = new RegExp(req.query.title, 'i')
        }
        

        const ads = await Ad.paginate(filters, {
            limit: 3,
            page: req.query.page || 1,
            sort: '-createdAt', //ordenando por createdAt desc
            populate: ['author'] //populate: caso o model possua relacionamento, vai acessar o campo do model relacionado('author') e mostrar os dados do registro desse model
        })
        return res.json(ads)
    }   

    async show(req, res){
        const ad = await Ad.findById(req.params.id)
        return res.json(ad)
    }

    async store(req, res){
        //para criar esta passando todo o body e , separadamente, o id do user logado como author
        const ad = await Ad.create({ ... req.body, author: req.userId })
        return res.json(ad)
    }

    async update(req, res){
        const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        return res.json(ad)
    }

    async destroy(req, res){
        await Ad.findByIdAndDelete(req.params.id)
        return res.send()
    }


}

module.exports = new AdController()