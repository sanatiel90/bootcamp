const User = require('../models/User')

class UserController {
    async index(req, res){
        const users = await User.find()
        return res.json(users)
    }
    
    async store(req, res){
        const { email } = req.body
        //verifica se email ja existe
        if(await User.findOne({ email })){
            return res.status(400).json({ error: "Usuário já existente" })
        }

        const user = await User.create(req.body)
        return res.json(user)
    }

}

module.exports = new UserController()