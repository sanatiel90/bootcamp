const User = require('../models/User')

class SessionController {
    //login da api
    async store(req, res){
        //dados do user q esta tentando logar
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({error:'User not found'})
        }
    
        //se senha nao bater
        if(!await user.compareHash(password)){
            return res.status(400).json({error:'Password invalid'})
        }
 
        return res.json({ user, token: User.generateToken(user) })
    }
}

module.exports = new SessionController()