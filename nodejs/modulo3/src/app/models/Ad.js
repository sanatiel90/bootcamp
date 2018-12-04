const mongoose = require('mongoose')

const AdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //relacionamnto com o model User
    author:{
        type: mongoose.Schema.Types.ObjectId, //id FK
        ref: 'User', //model a qual faz referencia
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Ad', AdSchema)