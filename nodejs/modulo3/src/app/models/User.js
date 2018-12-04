const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
      type: String,
      required: true
  },
  created_at: {
      type: Date,
      default: Date.now()
  }
})

//hooks/triggers para a tabela
//pre(): ativado antes de salvar; verifica se senha foi modifica, se foi aplica criptografia
//usando named funciton devido o mongoose
UserSchema.pre('save', async function(next){
    //se nao tiver modificado o field 'password' passa pra frente
    if(!this.isModified('password')){
        return next()
    }
    //se modificou entao criptografa
    this.password = await bcrypt.hash(this.password, 8) 
})

//User.methods = {}: cria metodos extras para model User
UserSchema.methods = {
    //met q compara o password informado no login com pass criptografado no BD
    compareHash(password){
        return bcrypt.compare(password, this.password)
    }

}

//define metodos static
UserSchema.statics = {
    //metodo para gerar token JWT; vai receber como param uma instancia de user, porém atraves de desestruturacao, vai usar apenas o id
    generateToken({ id }){
        //sign() metodo da lib jsonwebtoken para criar JWT; 1º param: payload, os dados q serao criptografados e armazenados no JWT
        //2º param: o secret do JWT; 3º param: obj contento options, como o tempo de expiracao
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        })

    }
}

module.exports = mongoose.model('User', UserSchema)