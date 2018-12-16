const { User } = require('../models')

const { Op } = require('sequelize')

class DashboardController {
    //lista os cabeleireiros(chamados de providers por serem provedores de serviço)
    async index(req, res){

        //const providers = await User.findAll({ where: { provider: true } })
        //usando paginacao
        const options = {
            page: req.query.page, // Default 1
            paginate: 10, // Default 25
            order: [['name', 'ASC']], 
        }
        options.where = {}
        options.where.provider = true

        if (req.query.name){
            options.where.name = { [Op.like]: `${req.query.name}%`  } 
        }
        
        const { docs, pages, total } =  await User.paginate(options)
        const providers = docs
        
        return res.render('dashboard', { providers })
        

    }
}

module.exports = new DashboardController